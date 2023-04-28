from django.shortcuts import render
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer, OrderSeralizer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets, status

def all_products(request):
    products = Product.objects.all()
    return render(request, 'store/all_products.html', {'products': products})

class ProductsView(APIView):
    serializer_class = ProductSerializer
    def get(self, request):
        detail = [{"name":detail.name,"category":detail.category.name} for detail in Product.objects.all()]
        return Response(detail)
    
class OrderView(APIView):
    def post(self, request):
        # print(request.data)
        return Response(request.data)

class Category(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# class Products(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer