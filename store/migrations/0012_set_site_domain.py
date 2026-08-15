from django.conf import settings
from django.db import migrations


def set_site_domain(apps, schema_editor):
    Site = apps.get_model("sites", "Site")
    host = getattr(settings, "CANONICAL_HOST", "")
    if not host:
        return
    Site.objects.update_or_create(
        pk=settings.SITE_ID, defaults={"domain": host, "name": host}
    )


def restore_example_com(apps, schema_editor):
    Site = apps.get_model("sites", "Site")
    Site.objects.filter(pk=settings.SITE_ID).update(
        domain="example.com", name="example.com"
    )


class Migration(migrations.Migration):

    dependencies = [
        ("store", "0011_customer_email_customer_phone_alter_customer_address_and_more"),
        ("sites", "0002_alter_domain_unique"),
    ]

    operations = [
        migrations.RunPython(set_site_domain, restore_example_com),
    ]
