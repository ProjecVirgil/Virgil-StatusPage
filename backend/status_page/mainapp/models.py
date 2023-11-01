import datetime
from django.db import models

# Create your models here.
#They are literals of the OBJECT classes. 
#Presets to be used to collect data directly linked to the DB.

class Service(models.Model):
    """This class represents a service in the database.

    Args:
        models (_type_): _description_
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20) # name of service

class ItemStatus(models.Model):
    """This class represents an item status in the database.

    Args:
        models (_type_): _description_
    """
    hour = models.IntegerField() #hour
    day = models.IntegerField() # day
    month = models.IntegerField() #month
    year = models.IntegerField() #yead
    status = models.BooleanField() # online/offline
    service = models.ForeignKey(Service, on_delete=models.CASCADE,null=True, blank=True)

class Feature(models.Model):
    """This class represents a feature in the database.

    Args:
        models (_type_): _description_
    """
    title = models.CharField(max_length=300) #title
    image = models.ImageField(upload_to='images/')  #image
    date = models.DateTimeField(auto_now_add=True) #date
    description = models.CharField(max_length=3000) #description
