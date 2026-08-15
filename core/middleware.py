from django.conf import settings
from django.http import HttpResponsePermanentRedirect


class RedirectWWWMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.canonical = getattr(settings, "CANONICAL_HOST", "")

    def __call__(self, request):
        host = request.get_host().split(":")[0].lower()
        if self.canonical and host == f"www.{self.canonical}":
            url = f"{request.scheme}://{self.canonical}{request.get_full_path()}"
            return HttpResponsePermanentRedirect(url)
        return self.get_response(request)
