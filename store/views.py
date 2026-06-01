import logging

from django.db import IntegrityError, transaction
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError as DRFValidationError

from .models import Category, Customer, Order, Product
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    OrderSerializer,
    CustomerSerializer,
)


class MeView(APIView):
    """Tells the SPA whether the visitor has signed in via Google.

    Returns the authenticated user's name + email so the checkout form can
    pre-fill them on returning visits. We override authentication_classes
    because the project default is empty (so storefront POSTs don't get
    CSRF-checked); for this read-only endpoint we want session auth.
    """

    authentication_classes = [SessionAuthentication]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({"authenticated": False})
        full_name = (user.get_full_name() or user.first_name or "").strip()
        data = {
            "authenticated": True,
            "name": full_name or user.username,
            "email": user.email or "",
        }
        # Pre-fill phone + address from the most recent order this account
        # has placed, so a returning shopper on a fresh device (no localStorage
        # yet) gets their last shipping info back without retyping. We prefer
        # the name they actually used at last checkout over the Google
        # profile name — same intuition: that's what they'll want again.
        last = (
            Customer.objects
            .filter(user=user)
            .order_by('-date_created')
            .first()
        )
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
        # context={'request': request} so OrderSerializer.create() can read
        # the session-authenticated auth.User off request._request.user and
        # link Customer.user to it.
        serializer = OrderSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        try:
            with transaction.atomic():
                serializer.save()
        except DRFValidationError as e:
            # raised from OrderSerializer.create() when product names don't exist
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
