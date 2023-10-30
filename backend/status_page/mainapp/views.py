from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from mainapp.models import ItemStatus,Service
from .serializers import ItemStatusSerializer,ServiceSerializer
from .utils import create_data


@api_view(['GET'])
def getService(request):
    items = Service.objects.all() #Prende tutti gli oggetti creati dal modello
    serializer = ServiceSerializer(items,many=True) #Cerca il modello nel serializer
    return Response(serializer.data) #Stampa i dati di tutti i modelli esistenti di quel tipo

#TEST FUNCTION
@api_view(['GET'])
def getNowStatus(request):
    data = create_data("https://projectvirgil.net/",1)
    serializer = ItemStatusSerializer(data=data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        item = ItemStatus(**validated_data)
        item.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)