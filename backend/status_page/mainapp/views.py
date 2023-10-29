from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from mainapp.models import ItemStatus
from .serializers import ItemStatusSerializer
from .utils import create_data

@api_view(['GET'])
def getTest(request):
    data = create_data("https://projectvirgil.net/",1)
    serializer = ItemStatusSerializer(data=data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        item = ItemStatus(**validated_data)
        item.save(using='uptime_db')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

