from django.urls import path
from . import views
import mainapp.task

urlpatterns = [
    path('',views.get_now_status),
    path('service/',views.get_service),
]
