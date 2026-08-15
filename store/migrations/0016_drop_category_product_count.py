from django.db import migrations

# store_category.product_count was added by a migration that was later deleted
# from the repo. The column survived in production as NOT NULL with no default
# and no model field, so every INSERT into store_category failed. Nothing in
# any branch reads it.
#
# IF EXISTS because the column is present in production and in db-synced local
# copies, but absent from a database built from these migrations.

DROP = 'ALTER TABLE store_category DROP COLUMN IF EXISTS product_count'
RESTORE = 'ALTER TABLE store_category ADD COLUMN IF NOT EXISTS product_count integer NULL'


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_widen_image_fields'),
    ]

    operations = [
        migrations.RunSQL(DROP, reverse_sql=RESTORE),
    ]
