from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("store", "0020_speciality_flag")]

    operations = [
        migrations.RemoveField(model_name="category", name="slug"),
        migrations.RemoveField(model_name="product", name="slug"),
    ]
