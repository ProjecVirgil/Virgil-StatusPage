from rest_framework import serializers
from mainapp.models import ItemStatus,Service

#Trasforma la classe in un JSON
class ItemStatusSerializer(serializers.ModelSerializer):
    """Serializer from Status item.

    Args:
        serializers (serializers): The model of serializer
    """
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    class Meta:
        """Data to display."""
        model = ItemStatus
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    """Serializer from Service item.

    Args:
        serializers (serializers): The model of serializer
    """
    class Meta:
        """Data to display."""
        model = Service
        fields = '__all__'
