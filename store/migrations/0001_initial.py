# Generated by Django 3.2.11 on 2023-01-30 14:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('slug', models.SlugField(blank=True, max_length=100, unique=True)),
            ],
            options={
                'verbose_name_plural': 'categories',
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('slug', models.SlugField(blank=True, max_length=100)),
                ('unit', models.CharField(choices=[('KG', 'Kilogram'), ('LTR', 'Liter'), ('GM', 'Gram'), ('PACKET', 'Packet')], default='KG', max_length=7)),
                ('description', models.TextField(blank=True)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('quantity', models.IntegerField(blank=True, default=0)),
                ('available', models.BooleanField(default=True)),
                ('image', models.ImageField(blank=True, upload_to='images/')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='store.category')),
                ('created_by', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='products', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Products',
                'ordering': ['name'],
            },
        ),
    ]
