"""core URL Configuration"""
import os

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import include, path, re_path


def spa(request, *_args, **_kwargs):
    """Catch-all that serves the Vite SPA's index.html so React Router can
    handle the client-side route. Whitenoise serves real static asset URLs
    BEFORE this view, so we only get here for paths the SPA owns
    (/, /checkout, etc.) — OR for stale hashed-asset URLs from old browser
    tabs after a rebuild, which we return 404 for so the browser doesn't try
    to parse HTML as JS/CSS."""
    last_segment = request.path.rsplit("/", 1)[-1]
    looks_like_asset = "." in last_segment  # e.g. main.js, style.css, foo.png
    if looks_like_asset:
        return HttpResponseNotFound()

    index_path = os.path.join(settings.BASE_DIR, "web", "dist", "index.html")
    if not os.path.isfile(index_path):
        return HttpResponseNotFound("SPA not built. Run `npm run build` in web/.")
    with open(index_path, "rb") as f:
        return HttpResponse(f.read(), content_type="text/html; charset=utf-8")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("store/", include("store.urls", namespace="store")),
    # SPA fallback — must come last. Excludes prefixes handled above:
    # `admin($|/)` and `store($|/)` cover both `/admin` and `/admin/...`
    # so `/admin` (no slash) reaches Django's APPEND_SLASH redirect instead
    # of being swallowed by the SPA. /static/ and /assets/* belong to
    # Whitenoise; /media/ belongs to Django's static() helper in dev.
    re_path(r"^(?!admin($|/)|store($|/)|static/|assets/|media/).*$", spa, name="spa"),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
