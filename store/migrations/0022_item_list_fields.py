from django.db import migrations, models

LAYOUT = {
    "DAL": ("DAL", "#F2E686", 1, 0),
    "MASALE": ("MASALA", "#EE9D9C", 2, 0),
    "RICE": ("RICE", "#9FE4F2", 3, 1),
    "DRY FRUITS": ("DRY FRUITS", "#EFC4F2", 4, 0),
    "SUGAR & JAGGERY": ("SUGAR & JAGGERY", "#F2D94F", 5, 0),
    "READY MIX": ("READY MIX", "#EE9DC9", 5, 1),
    "SUPER FOODS & SEEDS": ("SUPER FOODS & SEEDS", "#A0F8D0", 5, 2),
    "MILLETS": ("MILLETS", "#FFFE9E", 5, 3),
    "ATTA": ("ATTA", "#BDF9B1", 6, 0),
}


def seed(apps, schema_editor):
    Category = apps.get_model("store", "Category")
    for category in Category.objects.all():
        row = LAYOUT.get(category.name)
        if row is None:
            category.in_item_list = False
            category.save(update_fields=["in_item_list"])
            continue
        title, color, column, order = row
        category.list_title = title
        category.list_color = color
        category.list_column = column
        category.list_order = order
        category.save(
            update_fields=["list_title", "list_color", "list_column", "list_order"]
        )


class Migration(migrations.Migration):

    dependencies = [("store", "0021_drop_slugs")]

    operations = [
        migrations.AddField(
            model_name="category",
            name="in_item_list",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="category",
            name="list_title",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="category",
            name="list_color",
            field=models.CharField(blank=True, max_length=7),
        ),
        migrations.AddField(
            model_name="category",
            name="list_column",
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AddField(
            model_name="category",
            name="list_order",
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.RunPython(seed, migrations.RunPython.noop),
    ]
