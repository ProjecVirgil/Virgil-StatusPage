from argparse import _AttributeHolder
from django.db import models

# Create your models here.
#They are literals of the OBJECT classes. 
#Presets to be used to collect data directly linked to the DB.

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20) # name of service

class ItemStatus(models.Model):
    hour = models.IntegerField() #hour
    day = models.IntegerField() # day
    month = models.IntegerField() #month
    year = models.IntegerField() #yead
    status = models.BooleanField() # online/offline
    service = models.ForeignKey(Service, on_delete=models.CASCADE)


class Feature(models.Model):
      title = models.CharField(max_length=300) #title
      image = models.ImageField()  #image
      description = models.CharField(max_length=3000) #description