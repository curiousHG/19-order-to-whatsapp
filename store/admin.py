from django.contrib import admin

from .models import Category, Product, Customer, Order, OrderItem
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price','available','image']
    list_filter = ['available','category']
    list_editable = ['price', 'available','image']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'date_created']
    list_filter = ['date_created']
    search_fields = ['name', 'address']

# disable adding a new order item from the order page and view products of an order
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'quantity']
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'order_date']
    list_filter = ['order_date']
    search_fields = ['id', 'customer__username']
    inlines = [OrderItemInline]
    readonly_fields = ['customer', 'order_date']
    can_delete = False
    actions = None

    def has_add_permission(self, request):
        return False

    def get_queryset(self, request):
        qs = super(OrderAdmin, self).get_queryset(request)
        return qs.prefetch_related('products')

    def total(self, obj):
        return obj.get_total()

    def has_delete_permission(self, request, obj=None):
        return False



