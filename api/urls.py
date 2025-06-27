from django.urls import path
from . import views

urlpatterns = [
    path("categories", views.Categories.as_view(), name="categories"),
    path("products", views.Products.as_view(), name="products"),
    path("category/<int:category_id>/products", views.Products.as_view(), name="category_products"),
]