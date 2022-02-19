from django.shortcuts import render
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer, OrderSeralizer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

def all_products(request):
    products = Product.objects.all()
    return render(request, 'store/all_products.html', {'products': products})

class ProductsView(APIView):
    serializer_class = ProductSerializer
    def get(self, request):
        detail = [{"name":detail.name,"category":detail.category.name} for detail in Product.objects.all()]
        return Response(detail)
    
class OrderView(APIView):
    # permission_classes = (AllowAny,)
    def post(self, request):
        print(request.data)
        return Response(status=status.HTTP_200_OK)

class Category(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# class Products(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer