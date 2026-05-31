from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.all_products, name='all_products'),
    path('allcategories', views.AllCategories.as_view(), name='allcategories'),
    path('category', views.CategoryListView.as_view(), name='category'),
    path('category/<str:category>', views.CategoryListView.as_view(), name='category_detail'),
    path('products', views.ProductsView.as_view(), name='products'),
    path('customer', views.CustomerView.as_view(), name='customer'),
    path('order', views.OrderView.as_view(), name='order'),
]
