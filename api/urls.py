from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.AllCategories.as_view(), name="all_categories"),
]