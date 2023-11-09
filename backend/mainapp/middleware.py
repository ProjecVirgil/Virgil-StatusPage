import os

from django.http import HttpResponseForbidden

class APIMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/admin/'):
            return self.get_response(request)
        if request.path.startswith('/api/'):
            api_token = request.META.get('HTTP_AUTHORIZATION')
            if api_token:
                parts = api_token.split()
                if len(parts) == 2 and parts[0] == 'Token' and parts[1] == os.getenv("TOKEN"):
                    return self.get_response(request)

            return HttpResponseForbidden("Access to the API is forbidden. Invalid or missing token.")

        return self.get_response(request)
