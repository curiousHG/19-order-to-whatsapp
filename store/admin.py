from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product, Customer, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'unit', 'available', 'image_preview', 'last_updated']
    list_filter = ['category', 'available', 'unit']
    list_editable = ['price', 'available']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['image_preview']

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



