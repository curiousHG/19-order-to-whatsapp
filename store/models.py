from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True)
    
    class Meta:
        verbose_name_plural = 'categories'
    
    def __str__(self) -> str:
        return self.name
    
class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=255)
    created_by = models.ForeignKey(User, related_name='products', on_delete=models.CASCADE, null=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='images/', blank=True)
    
    class Meta:
        verbose_name_plural = 'Products'
        ordering = ['name']

    def __str__(self) -> str:
        return self.name

    
    