from rest_framework import serializers
from mainapp.models import ItemStatus,Service, Feature

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

class FeatureSeralizer(serializers.ModelSerializer):
    """"Serializer from Feature Item.

    Args:
        serializers (serializers): the model of serializer
    """
    class Meta:
        """Data to display."""
        model = Feature
        fields = '__all__'
