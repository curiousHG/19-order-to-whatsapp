import csv
from store.models import Category, Product
file = open('items.csv', 'r')
reader = csv.reader(file)

for row in reader:
    category = Category.objects.get_or_create(name=row[0])
    product = Product.objects.get_or_create(
        category=category[0],
        name=row[1],
    )
    # print(product)
    try:
        product[0].save()
    except Exception as e:
        print(e)

