import re
from collections import Counter
from dataclasses import dataclass

from store.item_list.constants import DEFAULT_BLOCK_FILL, SPECIALITY_PREFIX
from store.models import Category, Product


def printable(text):
    kept = []
    for char in text:
        try:
            char.encode("cp1252")
        except UnicodeEncodeError:
            continue
        kept.append(char)
    cleaned = re.sub(r"\s*/\s*", "/", "".join(kept))
    return re.sub(r"\s{2,}", " ", cleaned).strip(" /,")


def clean_description(text):
    text = re.sub(r"\s*/-", "", (text or "").replace("\u20b9", ""))
    return re.sub(r"\s{2,}", " ", text).strip()


@dataclass
class Block:
    title: str
    color: str
    column: int
    order: int
    items: list


def default_label(product):
    if product.brand:
        return f"{product.name} ({product.brand})"
    return product.name


def labels_for(products, speciality=False):
    drafted = [(p, default_label(p)) for p in products]
    clashes = Counter(label for _, label in drafted)

    labels = []
    for product, label in drafted:
        description = clean_description(product.description)
        if clashes[label] > 1 and description:
            label = f"{label} {description}"
        label = printable(label)
        labels.append(f"{SPECIALITY_PREFIX}{label}" if speciality else label)
    return labels


def unprintable_products():
    flagged = []
    for product in Product.objects.filter(available=True).order_by("name"):
        raw = default_label(product)
        if printable(raw) != raw:
            flagged.append((product, raw, printable(raw)))
    return flagged


def products_for(category):
    if category.shows_speciality:
        queryset = Product.objects.filter(is_speciality=True)
    else:
        queryset = category.products.all()
    return list(queryset.filter(available=True))


def build_blocks():
    categories = Category.objects.filter(in_item_list=True).order_by(
        "list_column", "list_order", "name"
    )

    blocks = []
    for category in categories:
        items = labels_for(products_for(category), category.shows_speciality)
        if not items:
            continue
        blocks.append(
            Block(
                title=category.block_title,
                color=category.list_color or DEFAULT_BLOCK_FILL,
                column=category.list_column,
                order=category.list_order,
                items=items,
            )
        )
    return blocks
