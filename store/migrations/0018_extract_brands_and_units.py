import re

from django.db import migrations

BRANDS = [
    ("19no", r"\(?\s*19\s*no\.?\s*\)?", re.I),
    ("MDH", r"\(?\s*MDH\s*\)?", re.I),
    ("Double Chabbi", r"\(?\s*DOUBLE\s+CHABBI\s*\)?", re.I),
    ("Lal Qilla", r"\(?\s*LAL\s+QILLA\s*\)?", re.I),
    ("Everest", r"\(?\s*Everest\s*\)?", re.I),
    ("Rajdhani", r"\(?\s*Rajdhani\s*\)?", re.I),
    ("Ram Dev", r"\(?\s*Ram\s*Dev\s*\)?", re.I),
    ("Gopalji", r"\(?\s*gopal\s*ji\s*\)?", re.I),
    # Parenthesised and case-sensitive: bare "gm" is a unit, "420" could be a size.
    ("420", r"\(\s*420\s*\)", 0),
    ("GM Foods", r"\(\s*GM\s*\)", 0),
]

# Only gram-scale sachets convert automatically; kg-scale packs are ambiguous.
SACHET = re.compile(r"\b\d{1,4}\s*(g|gm|gms)\b", re.I)
MULTI_SIZE = re.compile(r"\d+\s*/\s*\d+\s*(g|gm|kg|ml)", re.I)


def tidy(text):
    text = re.sub(r"[()]", " ", text or "")
    text = re.sub(r"(?i)(?<![\w])brand(?![\w])", " ", text)
    text = re.sub(r"\s{2,}", " ", text)
    # Only spaces and commas — a trailing hyphen is part of the ₹68/- notation.
    return text.strip(" ,")


SPLIT = re.compile(r"(\d+)\s*/\s*(\d+)\s*(gm|g|kg|ml)\b", re.I)


def split_multi_size(Product):
    """A row reading '20/50 gm' is two stocked sizes; make it two rows."""
    for p in list(Product.objects.all()):
        m = SPLIT.search(p.description or "")
        if not m:
            continue
        small, large, suffix = m.group(1), m.group(2), m.group(3)
        unit_word = "g" if suffix.lower() in ("g", "gm") else suffix.lower()

        bigger = Product.objects.get(pk=p.pk)
        bigger.pk = None
        bigger.description = tidy(SPLIT.sub(f"{large} {unit_word}", p.description))
        bigger.unit = "Pc"
        bigger.save()

        p.description = tidy(SPLIT.sub(f"{small} {unit_word}", p.description))
        p.unit = "Pc"
        p.save(update_fields=["description", "unit"])


def apply(apps, schema_editor):
    Product = apps.get_model("store", "Product")
    for p in Product.objects.all():
        name, desc, unit = p.name, p.description or "", p.unit
        brand = ""

        for label, pattern, flags in BRANDS:
            rx = re.compile(pattern, flags)
            if rx.search(name) or rx.search(desc):
                brand = label
                name = rx.sub(" ", name)
                desc = rx.sub(" ", desc)

        name, desc = tidy(name), tidy(desc)

        if unit == "Kg":
            unit = "KG"
        if unit == "KG" and SACHET.search(desc) and not MULTI_SIZE.search(desc):
            unit = "Pc"

        if desc == "Mansoori 65":
            desc = "Mansoori 65 kg bag"

        name = " ".join(
            (w.capitalize() if w.isupper() and len(w) > 3 else w[:1].upper() + w[1:])
            for w in name.split()
        )

        if (name, desc, unit, brand) != (p.name, p.description or "", p.unit, p.brand):
            p.name, p.description, p.unit, p.brand = name, desc, unit, brand
            p.save(update_fields=["name", "description", "unit", "brand"])

    split_multi_size(Product)


def unapply(apps, schema_editor):
    Product = apps.get_model("store", "Product")
    for p in Product.objects.exclude(brand=""):
        p.description = tidy(f"({p.brand}) {p.description or ''}")
        p.brand = ""
        p.save(update_fields=["description", "brand"])


class Migration(migrations.Migration):

    dependencies = [("store", "0017_add_product_brand")]

    operations = [migrations.RunPython(apply, unapply)]
