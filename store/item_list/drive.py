import base64
import binascii
import json
import os

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/drive"]
PDF_MIME = "application/pdf"


def credentials():
    raw = (settings.GOOGLE_SERVICE_ACCOUNT_JSON or "").strip()
    if not raw:
        raise ImproperlyConfigured("GOOGLE_SERVICE_ACCOUNT_JSON is not set.")

    if raw.startswith("{"):
        info = json.loads(raw)
    elif os.path.exists(raw):
        with open(raw) as handle:
            info = json.load(handle)
    else:
        try:
            info = json.loads(base64.b64decode(raw, validate=True))
        except (binascii.Error, UnicodeDecodeError, ValueError):
            raise ImproperlyConfigured(
                "GOOGLE_SERVICE_ACCOUNT_JSON is not JSON, base64-encoded JSON, "
                "or a readable path."
            )
    return service_account.Credentials.from_service_account_info(info, scopes=SCOPES)


def service():
    return build("drive", "v3", credentials=credentials(), cache_discovery=False)


def file_id():
    value = (settings.ITEM_LIST_PDF_FILE_ID or "").strip()
    if not value:
        raise ImproperlyConfigured("ITEM_LIST_PDF_FILE_ID is not set.")
    return value


def describe():
    return (
        service()
        .files()
        .get(
            fileId=file_id(),
            fields="id,name,mimeType,size,modifiedTime,"
                   "owners(emailAddress),capabilities(canEdit,canDownload)",
            supportsAllDrives=True,
        )
        .execute()
    )


def replace(path):
    media = MediaFileUpload(path, mimetype=PDF_MIME, resumable=False)
    return (
        service()
        .files()
        .update(
            fileId=file_id(),
            media_body=media,
            fields="id,name,size,modifiedTime,version",
            supportsAllDrives=True,
        )
        .execute()
    )
