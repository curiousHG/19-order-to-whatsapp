import tempfile
from pathlib import Path

from django.contrib import admin, messages
from django.core.exceptions import ImproperlyConfigured
from django.db import models
from django.forms import TextInput
from django.shortcuts import redirect
from django.urls import path
from django.utils.html import format_html
from googleapiclient.errors import HttpError

from store.item_list import drive
from store.item_list.blocks import build_blocks
from store.item_list.render import render
from store.models import Category, Product, Customer, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_hi', 'shows_speciality', 'in_item_list',
                    'list_title', 'list_color', 'list_column', 'list_order')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_hi', 'brand', 'description', 'unit', 'available',
                    'is_speciality', 'category', 'price', 'image_preview', 'last_updated']
    list_filter = ['category', 'brand', 'is_speciality', 'available', 'unit']
    list_editable = ['name_hi', 'brand', 'description', 'unit', 'available', 'is_speciality']
    search_fields = ['name', 'name_hi', 'brand', 'description']
    readonly_fields = ['image_preview']
    list_per_page = 50
    formfield_overrides = {
        models.TextField: {'widget': TextInput(attrs={'size': 28})},
        models.CharField: {'widget': TextInput(attrs={'size': 16})},
    }
    def get_urls(self):
        publish = path(
            "publish-item-list/",
            self.admin_site.admin_view(self.publish_view),
            name="store_product_publish_item_list",
        )
        return [publish] + super().get_urls()

    def publish_view(self, request):
        if request.method == "POST":
            self.publish(request)
        return redirect("admin:store_product_changelist")

    def publish(self, request):
        blocks = build_blocks()
        if not blocks:
            self.message_user(
                request, "No categories are marked for the item list.", messages.ERROR
            )
            return

        with tempfile.TemporaryDirectory() as workspace:
            target = Path(workspace) / "item-list.pdf"
            pages = render(blocks, str(target))
            try:
                uploaded = drive.replace(str(target))
            except (ImproperlyConfigured, HttpError) as error:
                self.message_user(request, f"Upload failed: {error}", messages.ERROR)
                return

        items = sum(len(block.items) for block in blocks)
        self.message_user(
            request,
            f"Published {items} items across {len(blocks)} blocks "
            f"({pages} pages) to {uploaded['name']}.",
            messages.SUCCESS,
        )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:50px;border-radius:4px;" />', obj.image.url)
        return "—"
    image_preview.short_description = "Preview"
    


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'address', 'date_created']
    list_filter = ['date_created']
    search_fields = ['name', 'phone', 'email', 'address']

# disable adding a new order item from the order page and view products of an order
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'quantity']
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'customer_address', 'order_date', 'formatted_products']
    list_filter = ['order_date']
    search_fields = ['id', 'customer__name']
    inlines = [OrderItemInline]
    readonly_fields = ['customer', 'order_date']
    can_delete = False
    actions = None


    def has_add_permission(self, request):
        return False

    def get_queryset(self, request):
        qs = super(OrderAdmin, self).get_queryset(request)
        return qs

    def total(self, obj):
        return obj.get_total()

    def has_delete_permission(self, request, obj=None):
        return False



