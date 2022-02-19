from django.test import TestCase
from store.models import Category, Product

# Create your tests here.
class TestCategoriesModel(TestCase):
    def setUp(self) -> None:
        self.data1 = Category.objects.create(name='django', slug='django')

    def test_category_model_entry(self):
        data = self.data1
        self.assertTrue(isinstance(data, Category))
        self.assertTrue(str(data), 'django')


# class TestProductsModel(TestCase):
#     def setUp(self) -> None:
#         self.data1 = Product.objects.create(name='django', slug='django', description='django description', price=100)

#     def test_product_model_entry(self):
#         data = self.data1
#         self.assertTrue(isinstance(data, Product))
#         self.assertTrue(str(data), 'django')
