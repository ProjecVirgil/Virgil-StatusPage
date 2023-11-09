import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from mainapp.models import ItemStatus,Service,Feature
from .serializers import ItemStatusSerializer,ServiceSerializer,FeatureSeralizer
from .utils import create_data,recover_last_day_percent,recover_last_month_percent

@api_view(['GET'])
def get_status(request,span:int):
    """In this function with the correct payload it return the correct percent data.

    Args:
        span (int): The span of time to recover and get
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    services = Service.objects.all()
    if(span == 7): #LAST 7 DAY
        reponse_dict = {}
        for _,element in enumerate(services):
            list_percent = recover_last_day_percent(element.id)
            reponse_dict[element.id] = list_percent
        return Response({"result":reponse_dict})
    elif(span == 12): #12 MONTH
        reponse_dict = {}
        for _,element in enumerate(services):
            list_percent = recover_last_month_percent(element.id)
            reponse_dict[element.id] = list_percent
        return Response({"result":reponse_dict})
    else:
        return Response({"result":"Error in the query"})

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
            'date': obj.date,
            'description': obj.description,
        }
        response_data.append(feature_data)

    return Response(response_data)
