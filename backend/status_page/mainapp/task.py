import threading
import time

from .serializers import ItemStatusSerializer
from .models import ItemStatus
from .utils import create_data

def search_status():
    """This function create the data to insert in the DB."""
    while True:
        services = {
            1 : "https://projectvirgil.net/"
        }
        for i in range(1,len(services) + 1):
            data = create_data(services[i],i)
            serializer = ItemStatusSerializer(data=data)
            if serializer.is_valid():
                validated_data = serializer.validated_data
                item = ItemStatus(**validated_data)
                item.save()
        time.sleep(3600)

# Avvia il task in un nuovo thread
threading.Thread(target=search_status).start()
