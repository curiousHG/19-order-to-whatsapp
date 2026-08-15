"""Django settings for the 19 Khari Baoli storefront.

Development values come from .env; production values come from Railway's
service variables. See .env.example for the development set.
"""
import os
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv(), override=False)

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

ENVIRONMENTS = ("development", "production")
ENVIRONMENT = os.getenv("ENVIRONMENT", "production")
if ENVIRONMENT not in ENVIRONMENTS:
    raise ImproperlyConfigured(
        f"ENVIRONMENT={ENVIRONMENT!r} is not one of {ENVIRONMENTS}"
    )

DEBUG = ENVIRONMENT == "development"

CANONICAL_HOST = os.getenv("CANONICAL_HOST", "19onlineshop.com")

ALLOWED_HOSTS = [
    "19onlineshop.com",
    "www.19onlineshop.com",
    "localhost",
    "127.0.0.1",
    ".up.railway.app",
    "192.168.0.101",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",                     # required by allauth
    "rest_framework",
    "store.apps.StoreConfig",
    "corsheaders",
    "cloudinary",
    "cloudinary_storage",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
]

SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

ACCOUNT_LOGIN_METHODS = {"email"}
ACCOUNT_SIGNUP_FIELDS = ["email*"]
ACCOUNT_EMAIL_VERIFICATION = "none"
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_LOGIN_ON_GET = True
ACCOUNT_LOGOUT_ON_GET = True
LOGIN_REDIRECT_URL = "/checkout"
ACCOUNT_LOGOUT_REDIRECT_URL = "/checkout"

# No mail is sent in normal use, but allauth emails on some paths (enumeration
# prevention, login-by-code). Django's unset default is SMTP on localhost:25,
# which doesn't exist and turns those into 500s. Override with a real backend
# if outbound mail is ever wanted.
EMAIL_BACKEND = os.getenv(
    "EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend"
)

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": os.getenv("GOOGLE_OAUTH_CLIENT_ID", ""),
            "secret": os.getenv("GOOGLE_OAUTH_CLIENT_SECRET", ""),
            "key": "",
        },
        "SCOPE": ["profile", "email"],
        "AUTH_PARAMS": {"access_type": "online", "prompt": "select_account"},
    },
}
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    # Empty: SessionAuthentication would CSRF-check storefront POSTs whenever an
    # admin session cookie is present, 403ing /store/order/.
    "DEFAULT_AUTHENTICATION_CLASSES": [],
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "core.middleware.RedirectWWWMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

CSRF_TRUSTED_ORIGINS = [
    "https://19onlineshop.com",
    "https://www.19onlineshop.com",
    "http://localhost:3000",
    "https://*.up.railway.app",
]

# Railway terminates SSL and forwards HTTP; without this Django builds the
# OAuth redirect_uri as http:// and Google rejects it.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

WSGI_APPLICATION = "core.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER", "postgres"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STORAGES = {
    "default": {"BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage"},
    "staticfiles": {
        "BACKEND": (
            "django.contrib.staticfiles.storage.StaticFilesStorage"
            if DEBUG
            else "whitenoise.storage.CompressedManifestStaticFilesStorage"
        )
    },
}

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATIC_URL = "static/"

# collectstatic pulls the Vite build here; Whitenoise then serves it at the
# site root, with core.urls' catch-all handling client-side routes.
STATICFILES_DIRS = [os.path.join(BASE_DIR, "web", "dist")]
WHITENOISE_ROOT = os.path.join(BASE_DIR, "staticfiles")
WHITENOISE_INDEX_FILE = True

MEDIA_ROOT = os.path.join(BASE_DIR, "media/")
MEDIA_URL = "/media/"

CLOUDINARY_STORAGE = {
    "CLOUDINARY_URL": os.getenv("CLOUDINARY_URL"),
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django's default routes request errors to mail_admins only, so with
# DEBUG=False a 500's traceback never reaches the logs.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "root": {"handlers": ["console"], "level": "INFO"},
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}
