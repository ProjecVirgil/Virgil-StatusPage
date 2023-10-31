import requests
from datetime import datetime,date,timedelta

from .models import ItemStatus

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

def recover_last_seven_days():
    """Recover the last seven days from today.

    Returns:
        list: last seven days
    """
    today = date.today()
    last_seven_days = [(today - timedelta(days=i)).day for i in range(7)]
    last_seven_days.reverse()
    return last_seven_days

def recover_last_day_percent(service_id):
    """Recover the last seven percent from today."""
    list_day = recover_last_seven_days()
    item_statuses = ItemStatus.objects.filter(day__in=list_day,service=service_id)
    sorted_items = sorted(item_statuses, key=lambda item_statuses: item_statuses.day)

    hashmap = {}
    for _,item in enumerate(sorted_items):
        if(item.day not in hashmap):
            hashmap[item.day] = []
        hashmap[item.day].append(item.status)

    result_list = []
    for _,value in hashmap.items():
        result_list.append(int((sum(value)/len(value))*100))
    # Convert the QuerySet to a list of actual objects
    return result_list

def recover_last_month_percent(service_id):
    """Recover the last month from today."""
    item_statuses = ItemStatus.objects.filter(month__lte=12,service=service_id)
    sorted_items = sorted(item_statuses, key=lambda item_statuses: item_statuses.month)
    hashmap = {}
    for _,item in enumerate(sorted_items):
        if(item.month not in hashmap):
            hashmap[item.month] = []
        hashmap[item.month].append(item.status)
    result_list = []
    for _,value in hashmap.items():
        result_list.append(int((sum(value)/len(value))*100))
    return result_list

