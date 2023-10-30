from django.contrib import admin
from .models import Service,ItemStatus,Feature
# Register your models here.
admin.site.register(Service)
admin.site.register(ItemStatus)
admin.site.register(Feature)