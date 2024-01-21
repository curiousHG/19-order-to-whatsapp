from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# custom model of quantity denomination of Kg, Ltr, Gm, packet


class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):

    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, blank=True)

    class QuantityDenomination(models.TextChoices):
        KG = "KG", "Kilogram"
        LTR = "LTR", "Liter"
        GM = "GM", "Gram"
        PC = "Pc", "Pc"
        # allow to add more choices


    unit = models.CharField(
        max_length=7,
        choices=QuantityDenomination.choices,
        default=QuantityDenomination.KG,

    )
    created_by = models.ForeignKey(
        User, related_name="products", on_delete=models.CASCADE, null=True, default=1
    )
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=0, default=0)
    quantity = models.IntegerField(default=0, blank=True)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to="images/", blank=True)

    class Meta:
        verbose_name_plural = "Products"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

# create a model for Customer

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=500, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self) -> str:
        return self.name
    
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    # products is just a dict with name as key and quantity as value
    products = models.JSONField("products", default=list)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.pk} - {self.customer.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in Order #{self.order.pk}"