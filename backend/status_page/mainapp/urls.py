from django.urls import path
from . import views


urlpatterns = [
    path('',views.getNowStatus),
    path('service/',views.getService),
]
