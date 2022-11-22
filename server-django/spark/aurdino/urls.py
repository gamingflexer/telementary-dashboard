from unicodedata import name
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [path('api/location', views.location, name='location'),
               path('api/heartbeat', views.heartbeat, name='heartbeat'),
               path('api/cell', views.cell, name='cell')]