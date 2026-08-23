import tempfile
from pathlib import Path

from django.core.exceptions import ImproperlyConfigured
from django.core.management.base import BaseCommand, CommandError
from googleapiclient.errors import HttpError

from store.item_list import drive
from store.item_list.blocks import build_blocks, unprintable_products
from store.item_list.render import render


class Command(BaseCommand):
    help = "Render the customer-facing item list PDF and replace it in Drive."

    def add_arguments(self, parser):
        parser.add_argument("--out", help="Render to this path and skip the upload.")
        parser.add_argument(
            "--check",
            action="store_true",
            help="Report Drive access for the target file and exit.",
        )

    def handle(self, *args, **options):
        if options["check"]:
            return self.check_access()

        blocks = build_blocks()
        if not blocks:
            raise CommandError("No categories are marked for the item list.")

        for product, raw, shown in unprintable_products():
            self.stderr.write(
                f"dropped unsupported characters: {raw!r} prints as {shown!r} "
                f"(product {product.pk}; edit the product name to control this)"
            )

        items = sum(len(block.items) for block in blocks)

        if options["out"]:
            pages = render(blocks, options["out"])
            self.stdout.write(
                self.style.SUCCESS(
                    f"{items} items across {len(blocks)} blocks -> "
                    f"{options['out']} ({pages} pages)"
                )
            )
            return

        with tempfile.TemporaryDirectory() as workspace:
            target = Path(workspace) / "item-list.pdf"
            pages = render(blocks, str(target))
            try:
                uploaded = drive.replace(str(target))
            except (ImproperlyConfigured, HttpError) as error:
                raise CommandError(str(error))

        self.stdout.write(
            self.style.SUCCESS(
                f"{items} items across {len(blocks)} blocks -> "
                f"{uploaded['name']} ({pages} pages, version {uploaded.get('version')}, "
                f"modified {uploaded.get('modifiedTime')})"
            )
        )

    def check_access(self):
        try:
            details = drive.describe()
        except (ImproperlyConfigured, HttpError) as error:
            raise CommandError(str(error))
        capabilities = details.get("capabilities", {})
        owners = ", ".join(
            owner.get("emailAddress", "?") for owner in details.get("owners", [])
        )

        self.stdout.write(f"name      {details.get('name')}")
        self.stdout.write(f"id        {details.get('id')}")
        self.stdout.write(f"mimeType  {details.get('mimeType')}")
        self.stdout.write(f"owner     {owners or '(hidden)'}")
        self.stdout.write(f"modified  {details.get('modifiedTime')}")

        if capabilities.get("canEdit"):
            self.stdout.write(self.style.SUCCESS("canEdit   yes - safe to publish"))
        else:
            self.stdout.write(
                self.style.ERROR("canEdit   NO - the service account cannot write")
            )
