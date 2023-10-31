import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from mainapp.models import ItemStatus,Service,Feature
from .serializers import ItemStatusSerializer,ServiceSerializer,FeatureSeralizer
from .utils import create_data


@api_view(['GET'])
def get_service(request):
    """Return all the service avaible.

    Args:
        request (_type_): Request

    Returns:
        Response: The json formatted result with all the service
        {
            id: 1,
            name: "service1"
        }
    """
    items = Service.objects.all() #Prende tutti gli oggetti creati dal modello
    serializer = ServiceSerializer(items,many=True) #Cerca il modello nel serializer
    return Response(serializer.data) #Stampa i dati di tutti i modelli esistenti di quel tipo

#TEST FUNCTION
@api_view(['GET'])
def get_now_status(request):
    """This function return all status information about all the service.

    Args:
        request (_type_): Request

    Returns:
        Response: The json formatted result
        {
            hour = 11
            day = 12
            month = 2
            year = 2023
            status = 1 (1 =  True 0 = False)
            service = 1 (Index of the service)
        }
    """
    data = create_data("https://projectvirgil.net/",1)
    serializer = ItemStatusSerializer(data=data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        item = ItemStatus(**validated_data)
        item.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_feature(request):
    """"This feature return all the information about the new features.

    Args:
        request (_type_): request

    Returns:
        Response: A string with a 64 base
    """
    features = Feature.objects.all()

    response_data = []
    for obj in features:
        with open(obj.image.path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        feature_data = { 
            'title': obj.title,
            'image': encoded_string,
            'description': obj.description,
        }
        response_data.append(feature_data)

    return Response(response_data)
