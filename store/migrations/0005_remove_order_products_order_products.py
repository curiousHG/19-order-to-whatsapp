# Generated by Django 4.2 on 2024-01-20 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_order_orderitem_order_products_customer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='products',
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.JSONField(default=list, verbose_name='products'),
        ),
    ]
