from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# custom model of quantity denomination of Kg, Ltr, Gm, packet

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True, blank=True)
    image = models.ImageField(upload_to='categories/', blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name",]

    def __str__(self) -> str:
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='products/', blank=True)

    class Meta:
        verbose_name_plural = "products"
        ordering = ["name",]

    def __str__(self) -> str:
        return self.name
