# import csv
# from store.models import Category, Product
# file = open('items.csv', 'r')
# reader = csv.reader(file)

# for row in reader:
#     category = Category.objects.get_or_create(name=row[0])
#     product = Product.objects.get_or_create(
#         category=category[0],
#         name=row[1],
#     )
#     # print(product)
#     try:
#         product[0].save()
#     except Exception as e:
#         print(e)
import pandas as pd
import numpy as np
data = pd.read_csv('data/items.csv',header = None)
arr = data.iloc[:,0].unique()
arr = np.array(arr)
# comma array
arr = arr.tolist()
print(arr)
