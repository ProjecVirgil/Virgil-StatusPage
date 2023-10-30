import requests
from datetime import datetime

MINVALUE = 200
MAXVALUE = 400

def is_service_online(url):
    """Check if a service is online. Returns True or False and the time it took to check in seconds.

    Args:
        url (_type_): _description_

    Returns:
        bool: Online or Offline
    """
    try:
        response = requests.get(url, timeout=5)  # Set a timeout of 5 seconds.
        # If the response has a status between 200 and 400, we consider the service to be online.
        return MINVALUE <= response.status_code < MAXVALUE
    except requests.RequestException:  # This catches most of the `requests` exceptions.
        return False

def create_data(urs_service,id):
    """Create data for each URS Service.

    Args:
        urs_service (_type_): _description_
        id (_type_): _description_

    Returns:
        json: The data created with the actual date
    """
    result = is_service_online(urs_service)
    now= datetime.now()
    formatted = now.strftime("%Y-%m-%d/%a/%H:%M:%S").split("/")
    data = {
        "hour":int(formatted[2].split(":")[0]),
        "year":int(formatted[0].split("-")[0]), #yead
        "month":int(formatted[0].split("-")[1]), #month
        "day":int(formatted[0].split("-")[2]), #day
        "status":result, # online/offline
        "service":id, # id of service
    }
    return data
