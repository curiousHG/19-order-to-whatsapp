from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# custom model of quantity denomination of Kg, Ltr, Gm, packet

class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    slug = models.SlugField(max_length=100, db_index=True, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name",]

    def __str__(self) -> str:
        return self.name
