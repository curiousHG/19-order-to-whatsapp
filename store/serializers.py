from rest_framework import serializers
from .models import Category, Product, Order, Customer, OrderItem
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    
    # category is a foreign key so we need to serialize it
    # category = serializers.CharField(source='category.name')
    class Meta:
        model = Product
        fields = ('id','category', 'name', 'price','unit','description', 'image')

class OrderSeralizer(serializers.ModelSerializer):
    products = ProductSerializer(many = True, read_only = True)
    class Meta:
        model = Product
        fields = ('id','products')


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'products')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'address', 'date_created')

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    unit = serializers.CharField()
    quantity = serializers.FloatField()

    class Meta:
        model = OrderItem
        fields = ("product_id", "quantity", "unit")

    def create(self, validated_data):
        product_id = validated_data.pop("product_id")
        validated_data["product"] = Product.objects.get(pk=product_id)
        return OrderItem.objects.create(**validated_data)

class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(many=True)
    customer = CustomerSerializer()


    class Meta:
        model = Order
        fields = ("customer", "products")

    def create(self, validated_data):
        customer_data = validated_data.pop("customer")
        products_data = validated_data.pop("products")

         # Try to find existing customer by name and address
        customer = Customer.objects.filter(
            name=customer_data.get("name"),
            address=customer_data.get("address")
        ).first()

        if not customer:
            customer = Customer.objects.create(**customer_data)

        order = Order.objects.create(customer=customer)
        products_list = []
        for product_data in products_data:
            product_id = product_data.get("product_id")
            product = Product.objects.get(pk=product_id)
            quantity = f'{product_data.get("quantity")} {product_data.get("unit")}'
            item = {"product": product.name, "quantity": quantity}
            products_list.append(item)
            OrderItem.objects.create(order=order, product=product, quantity=quantity)

        order.products = products_list
        order.save()
        return order