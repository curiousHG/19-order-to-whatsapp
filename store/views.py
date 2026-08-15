import logging

from allauth.socialaccount.models import SocialAccount
from django.db import IntegrityError, transaction
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError as DRFValidationError

from store.identity import find_customer
from store.models import Category, Customer, Order, Product
from store.serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
    CustomerSerializer,
)


class MeView(APIView):
    # Project default is no auth classes; this read-only endpoint wants session auth.
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        user = request.user
        # Admin shares this session cookie, so require a storefront Google sign-in.
        if not user.is_authenticated or not SocialAccount.objects.filter(user=user).exists():
            return Response({"authenticated": False})
        full_name = (user.get_full_name() or user.first_name or "").strip()
        data = {
            "authenticated": True,
            "name": full_name or user.username,
            "email": user.email or "",
        }
        # Authenticated only — resolving anonymous phone numbers would leak addresses.
        last = find_customer(user=user, email=user.email or "")
        if last:
            if last.name:
                data["name"] = last.name
            if last.phone:
                data["phone"] = last.phone
            if last.address:
                data["address"] = last.address
        return Response(data)

logger = logging.getLogger(__name__)


def all_products(request):
    products = Product.objects.all()
    return render(request, "store/all_products.html", {"products": products})


class AllCategories(APIView):
    def get(self, request):
        categories = Category.objects.all()
        data = [{"id": category.id, "name": category.name} for category in categories]
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
        return Response(details)


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, category=None, format=None):
        if category:
            products = Product.objects.filter(category__name=category)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        return self.list(request)

    def post(self, request, format=None):
        pass


class CustomerView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            serializer.save()
        except IntegrityError:
            logger.exception("IntegrityError creating customer")
            return Response(
                {"detail": "Could not save customer due to a database error."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(
            {"message": "customer created"}, status=status.HTTP_201_CREATED
        )


class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                serializer.save()
        except DRFValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            logger.exception("IntegrityError creating order")
            return Response(
                {
                    "detail": (
                        "Could not save your order due to a database error. "
                        "Please try again in a moment."
                    )
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except Exception:
            logger.exception("Unexpected error creating order")
            return Response(
                {"detail": "Unexpected error processing the order. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(
            {"message": "order created"}, status=status.HTTP_201_CREATED
        )
