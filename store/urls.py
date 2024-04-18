from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.all_products, name='products'),
    path('order/', views.OrderView.as_view(), name='order'),
    path('category/', views.Category.as_view(), name='category'),

    path('products/', views.ProductsView.as_view(), name='products'),
    path('category/<str:category>', views.Category.as_view(), name='category'),
    
    # api to create a new customer
    path('customer', views.CustomerView.as_view(), name='customer'),
    path('order', views.OrderView.as_view(), name='order'),
]
