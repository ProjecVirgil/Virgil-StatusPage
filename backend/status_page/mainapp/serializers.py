from rest_framework import serializers
from mainapp.models import ItemStatus,Service

#Trasforma la classe in un JSON
class ItemStatusSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    class Meta:
        model = ItemStatus
        fields = '__all__'
        
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        