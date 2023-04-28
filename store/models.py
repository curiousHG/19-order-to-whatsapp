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
