import requests

FREE_FOREX_API = "https://api.exchangerate.host/latest"

def get_live_forex():
    response = requests.get(FREE_FOREX_API)
    if response.status_code == 200:
        return response.json()
    return {}
