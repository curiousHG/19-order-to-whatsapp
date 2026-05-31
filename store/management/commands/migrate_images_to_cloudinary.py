"""Upload local Product images to Cloudinary.

Reads files from settings.MEDIA_ROOT and uploads each Product.image to Cloudinary
using cloudinary.uploader.upload directly (bypasses Django's storage backend, so
it works whether the deployment is still on FileSystemStorage or already switched
to MediaCloudinaryStorage).

After upload, Product.image.name is left unchanged — the relative path becomes a
valid Cloudinary public_id (sans extension), so MediaCloudinaryStorage.url() will
serve it correctly once STORAGES is switched.

Run on the deployment that has the local files (i.e. the prod service with the
Railway volume mounted):

    railway run uv run python manage.py migrate_images_to_cloudinary --dry-run
    railway run uv run python manage.py migrate_images_to_cloudinary
"""
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from store.models import Product

import cloudinary.uploader


class Command(BaseCommand):
    help = "Upload local Product.image files to Cloudinary"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true", help="List actions without uploading")

    def handle(self, *args, **opts):
        dry = opts["dry_run"]
        media_root = settings.MEDIA_ROOT
        migrated = skipped = missing = errored = 0

        for p in Product.objects.exclude(image="").iterator():
            name = p.image.name

            if name.startswith(("image/upload/", "http://", "https://")):
                self.stdout.write(f"[skip ] {p.id} already-remote: {name}")
                skipped += 1
                continue

            local_path = os.path.join(media_root, name)
            if not os.path.isfile(local_path):
                self.stdout.write(self.style.WARNING(f"[miss ] {p.id} not-on-disk: {local_path}"))
                missing += 1
                continue

            public_id = os.path.splitext(name)[0]

            if dry:
                self.stdout.write(f"[dry  ] {p.id} would upload {local_path} -> public_id={public_id}")
                migrated += 1
                continue

            try:
                cloudinary.uploader.upload(local_path, public_id=public_id, overwrite=True)
                self.stdout.write(self.style.SUCCESS(f"[ok   ] {p.id} -> {public_id}"))
                migrated += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"[err  ] {p.id} {e}"))
                errored += 1

        self.stdout.write(
            f"\nDone: migrated={migrated} skipped={skipped} missing={missing} errored={errored}"
        )
