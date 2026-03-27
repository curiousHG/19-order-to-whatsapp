from django.shortcuts import render
from django.http import JsonResponse
from .models import Category, Product, Order, Customer
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
    CustomerSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view
from cloudinary.utils import cloudinary_url


def all_products(request):
    products = Product.objects.all()
    return render(request, "store/all_products.html", {"products": products})


class AllCategories(APIView):
    def get(self, request):
        categories = Category.objects.all()
        data = [
            {
                "id": category.id,
                "name": category.name,
                "image": cloudinary_url(
                    category.image.public_id,
                    secure=True,
                    transformation=[
                        {"width": 100, "quality": "auto", "fetch_format": "auto"}
                    ],
                )[0] if category.image.url else "",
                "product_count": category.product_count,
            }
            for category in categories
        ]
        return Response(data)


class ProductsView(APIView):
    serializer_class = ProductSerializer

    def get(self, request):
        details = [
            {
                "id": detail.id,
                "name": detail.name,
                "category": detail.category.name,
                "price": detail.price,
            }
            for detail in Product.objects.all()
        ]
        # print( Product.objects.all()[1].__dict__)
        return Response(details)


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, category_id=None, format=None):
        if category_id is not None:
            # category = category.upper()
            products = Product.objects.filter(category__id=category_id)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        return self.list(request)

    # this is post request to update the prices of all products in a category
    def post(self, request, format=None):
        pass


class CustomerView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    # create a post method to create a new customer
    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "customer created"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # create a post method to create a new order
    # print the request data
    def post(self, request, format=None):

        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "order created"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
