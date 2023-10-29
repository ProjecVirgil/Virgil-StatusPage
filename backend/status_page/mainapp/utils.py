
import requests
from datetime import datetime

def is_service_online(url):
    try:
        response = requests.get(url, timeout=5)  # Set a timeout of 5 seconds.
        # If the response has a status between 200 and 400, we consider the service to be online.
        if 200 <= response.status_code < 400:
            return True
        else:
            return False
    except requests.RequestException:  # This catches most of the `requests` exceptions.
        return False
    
def create_data(urs_service,id):
    result = is_service_online(urs_service) 
    now= datetime.now()
    formatted = now.strftime("%Y-%m-%d/%a/%H:%M:%S").split("/")
    map_day = {
        "Mon":1,
        "Tue":2,
        "Wed":3,
        "Thu":4,
        "Fri":5,
        "Sat":6,
        "Sun":7
    }
    data = {
        "hour":int(formatted[2].split(":")[0]),
        "day":int(formatted[0].split("-")[0]), #yead
        "month":int(formatted[0].split("-")[1]), #month
        "year":int(formatted[0].split("-")[2]), #day
        "status":result, # online/offline
        "service":id, # id of service
    }
    return data