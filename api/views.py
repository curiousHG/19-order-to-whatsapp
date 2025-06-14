from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category  # Assuming you have a Category model defined in models.py
from rest_framework import status

# Create your views here.

class AllCategories(APIView):
    def get(self, request):
        categories = Category.objects.all()
        data = [{"id": category.id, "name": category.name} for category in categories]
        return Response(data)