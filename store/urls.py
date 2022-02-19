from django.urls import path
from . import views
app_name = 'store'

urlpatterns = [
    path('', views.all_products, name='products'),
    path('order/', views.OrderView.as_view(), name='home'),
    path('category/', views.Category.as_view(), name='category'),
    path('products/', views.ProductsView.as_view(), name='product'),
]
