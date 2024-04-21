from rest_framework import serializers
from .models import Category, Product, Order, Customer, OrderItem
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    
    # category is a foreign key so we need to serialize it
    # category = serializers.CharField(source='category.name')
    class Meta:
        model = Product
        fields = ('id','category', 'name', 'price','unit')

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

    # "products":{
    #         "Chai Masala": "4 KG",
    #         "Chakki Atta": "2 KG"
    #     }
    product = serializers.CharField()
    quantity = serializers.CharField()
    class Meta:
        model = OrderItem
        fields = ('product', 'quantity')

class OrderSerializer(serializers.ModelSerializer):

    products = serializers.ListField(child=OrderItemSerializer())
    customer = CustomerSerializer()
    class Meta:
        model = Order
        fields = ('customer', 'products')

    def create(self, validated_data):
        # print(validated_data)
        
        customer = validated_data.pop('customer')
        products = validated_data.pop('products')
        # print(products)
        # products is a dict with name as key and quantity as value
        """
        "products":{
            "Chai Masala": "4 KG",
            "Chakki Atta": "2 KG"
        }
        """

        # everytime create a new customer 
        user = Customer.objects.create(**customer)
        order = Order.objects.create(customer=user)
        products_list = []
        for product_data in products:
            product_name = product_data['product']
            product_quantity = product_data['quantity']
            item = {"product": product_name, "quantity": product_quantity}
            products_list.append(item)
            product_obj = Product.objects.get(name=product_name)
            OrderItem.objects.create(order=order, product=product_obj, quantity=product_quantity)
        order.products = products_list
        order.save()
        return order