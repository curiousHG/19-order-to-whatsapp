from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home/', index),
    path('final/', index),
    path('price/', index),
    path('bill/', index),
]
app_name = 'core'