from django.contrib import admin

# Register your models here.
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug", "image")
    search_fields = ("name",)
    list_filter = ("name",)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug", "description", "price", "category", "image")
    search_fields = ("name", "description")
    list_filter = ("category",)
    ordering = ("-price",)