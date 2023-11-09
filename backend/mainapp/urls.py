from django.urls import path

from . import views
import mainapp.task

urlpatterns = [
    path('service/',views.get_service),
    path('feature/',views.get_feature),
    path('status/<int:span>',views.get_status)
]
