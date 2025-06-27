from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Product  # Assuming you have a Category model defined in models.py
from rest_framework import status

# Create your views here.

class Categories(APIView):
    def get(self, request):
        categories = Category.objects.all()
        data = {
            "categories": [
                {
                    "id": category.id,
                    "name": category.name,
                    "description": category.description,
                }
                for category in categories
            ]
        }
        if not data["categories"]:
            return Response({"message": "No categories found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data)

class Products(APIView):
    def get(self, request):
        if request.query_params.get("category_id"):
            category_id = request.query_params.get("category_id")
            products = Product.objects.filter(category_id=category_id)
        else:
            products = Product.objects.all()
        data = {
            "products": [
                {
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "category_id": product.category_id,
                }
                for product in products
            ]
        }
        if not data["products"]:
            return Response({"message": "No products found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data)