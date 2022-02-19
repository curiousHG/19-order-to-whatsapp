from django.contrib import admin

from .models import Category, Product
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price','available','image']
    list_filter = ['available']
    list_editable = ['price', 'available','image']
    prepopulated_fields = {'slug': ('name',)}