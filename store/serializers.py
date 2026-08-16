import re

import cloudinary
from django.contrib.auth import get_user
from rest_framework import serializers
from store.identity import upsert_customer
from store.models import Category, Product, Order, Customer, OrderItem


def _resolve_image_url(image_field):
    # Legacy rows store a full upload fragment; Cloudinary would double-prefix it.
    if not image_field:
        return None
    name = image_field.name
    if name.startswith('image/upload/'):
        cloud = cloudinary.config().cloud_name
        if cloud:
            return f'https://res.cloudinary.com/{cloud}/{name}'
    return image_field.url


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return _resolve_image_url(obj.image)

    class Meta:
        model = Product
        fields = ('id', 'category', 'name', 'brand', 'price', 'unit', 'description', 'image', 'available')


class OrderSeralizer(serializers.ModelSerializer):
    products = ProductSerializer(many = True, read_only = True)
    class Meta:
        model = Product
        fields = ('id','products')


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return _resolve_image_url(obj.image)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'image', 'products')

class CustomerSerializer(serializers.ModelSerializer):
    # Model stays nullable for historical rows; new orders must carry all three.
    name = serializers.CharField(max_length=100, allow_blank=False, trim_whitespace=True)
    address = serializers.CharField(max_length=500, allow_blank=False, trim_whitespace=True)
    phone = serializers.CharField(max_length=20, allow_blank=False, trim_whitespace=True)

    class Meta:
        model = Customer
        fields = ('id', 'name', 'address', 'phone', 'email', 'date_created')

    def validate_phone(self, value):
        digits = re.sub(r'\D', '', value)
        if len(digits) < 10:
            raise serializers.ValidationError(
                "Enter a phone number with at least 10 digits."
            )
        return value

class OrderItemSerializer(serializers.Serializer):
    productId = serializers.IntegerField()
    quantity = serializers.CharField()


class OrderSerializer(serializers.ModelSerializer):

    products = serializers.ListField(child=OrderItemSerializer())
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = ('customer', 'products')

    def create(self, validated_data):
        customer_details = validated_data.pop('customer')
        products = validated_data.pop('products')  # [{productId, quantity}, ...]

        # Validate before creating anything, so a stale id leaves no orphan rows.
        ids = [p['productId'] for p in products]
        found = {p.id: p for p in Product.objects.filter(id__in=ids)}
        missing = [str(i) for i in ids if i not in found]
        if missing:
            raise serializers.ValidationError(
                {'products': f"Unknown product id(s): {', '.join(missing)}"}
            )

        # DRF overwrites request.user with AnonymousUser (no auth classes), so read the session.
        request = self.context.get('request')
        django_request = getattr(request, '_request', request)
        user = get_user(django_request) if getattr(django_request, 'session', None) else None

        customer = upsert_customer(customer_details, user=user)
        order = Order.objects.create(customer=customer)
        snapshot = []
        for product_data in products:
            product = found[product_data['productId']]
            qty = product_data['quantity']
            # Snapshot the name at order time so later renames don't rewrite history.
            parts = [product.brand, product.name, (product.description or '').strip()]
            name = ' '.join(x for x in parts if x)
            snapshot.append({"product": name, "quantity": qty})
            OrderItem.objects.create(order=order, product=product, quantity=qty)
        order.products = snapshot
        order.save(update_fields=['products'])
        return order