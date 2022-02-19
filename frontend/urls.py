from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home/', index),
]
app_name = 'core'