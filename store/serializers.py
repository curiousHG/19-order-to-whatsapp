import re

import cloudinary
from rest_framework import serializers
from .models import Category, Product, Order, Customer, OrderItem
from django.contrib.auth.models import User


def _resolve_image_url(image_field):
    """Resolve the public URL of an ImageField.

    Some legacy rows stored `image.name` as a full Cloudinary URL fragment
    (e.g. "image/upload/v1751625404/foo.jpg"). The Cloudinary storage
    backend would then wrap that in another `image/upload/v1/` prefix,
    producing a broken doubled URL. Detect that case and build the URL
    directly from the cloud name.
    """
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
        fields = ('id', 'category', 'name', 'price', 'unit', 'description', 'image', 'available')


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
    # The model keeps these nullable so historical rows and admin-created
    # Customers still load, but a new order must carry all three. The API is
    # AllowAny, so the checkout form's validation cannot be the only gate.
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
    """Incoming cart line. We accept `productId` (the canonical reference —
    cart state stores it) and resolve the name server-side from the DB so
    product renames don't break in-flight orders."""
    productId = serializers.IntegerField()
    quantity = serializers.CharField()


class OrderSerializer(serializers.ModelSerializer):

    products = serializers.ListField(child=OrderItemSerializer())
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = ('customer', 'products')

    def create(self, validated_data):
        customer = validated_data.pop('customer')
        products = validated_data.pop('products')  # [{productId, quantity}, ...]

        # Validate all referenced products exist BEFORE creating the customer
        # or order, so a stale ID doesn't leave orphan Customer rows.
        ids = [p['productId'] for p in products]
        found = {p.id: p for p in Product.objects.filter(id__in=ids)}
        missing = [str(i) for i in ids if i not in found]
        if missing:
            raise serializers.ValidationError(
                {'products': f"Unknown product id(s): {', '.join(missing)}"}
            )

        user = Customer.objects.create(**customer)
        order = Order.objects.create(customer=user)
        snapshot = []
        for product_data in products:
            product = found[product_data['productId']]
            qty = product_data['quantity']
            # The snapshot keeps `name + description` AT ORDER TIME — that's
            # what the admin and WhatsApp message use, so a later rename
            # (or description tweak) doesn't rewrite history. Description
            # disambiguates products that share a base name e.g.
            # "Atta (19no)" vs "Atta (10kg pack)".
            desc = (product.description or '').strip()
            name = f"{product.name} {desc}".strip() if desc else product.name
            snapshot.append({"product": name, "quantity": qty})
            OrderItem.objects.create(order=order, product=product, quantity=qty)
        order.products = snapshot
        order.save(update_fields=['products'])
        return order