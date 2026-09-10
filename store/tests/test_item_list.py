import base64
import io
import re
import json
import tempfile
from unittest.mock import patch

from django.contrib.auth.models import User
from django.contrib import messages
from django.core.exceptions import ImproperlyConfigured
from django.test import TestCase, override_settings
from django.urls import reverse

from store.item_list import drive

from store.item_list.blocks import (build_blocks, clean_description,
                                    default_label, labels_for, printable)
from store.item_list.constants import PAIRS_PER_PAGE
from store.item_list.render import Cell, lay_out, render
from store.models import Category, Product


class LabelTests(TestCase):

    def setUp(self):
        self.category = Category.objects.create(name="RICE", list_color="#9FE4F2")

    def product(self, **kwargs):
        kwargs.setdefault("category", self.category)
        kwargs.setdefault("created_by", None)
        return Product.objects.create(**kwargs)

    def test_brand_is_appended_in_parentheses(self):
        self.assertEqual(
            default_label(self.product(name="Sambhar Masala", brand="Everest")),
            "Sambhar Masala (Everest)",
        )

    def test_label_is_bare_name_without_a_brand(self):
        self.assertEqual(default_label(self.product(name="Bura")), "Bura")

    def test_clashing_labels_fall_back_to_the_description(self):
        first = self.product(name="Chawal Basmati", description="regular ₹110/-")
        second = self.product(name="Chawal Basmati", description="pauna ₹80/-")
        self.assertEqual(
            labels_for([first, second]),
            ["Chawal Basmati regular 110", "Chawal Basmati pauna 80"],
        )

    def test_unique_labels_ignore_the_description(self):
        product = self.product(name="Rice Sona", description="Mansoori 65 kg bag")
        self.assertEqual(labels_for([product]), ["Rice Sona"])

    def test_speciality_items_are_starred(self):
        product = self.product(name="Hing Special", brand="19no")
        self.assertEqual(
            labels_for([product], speciality=True), ["*Hing Special (19no)"]
        )

    def test_rupee_and_trailing_dash_are_stripped(self):
        self.assertEqual(clean_description("premium ₹150/-"), "premium 150")
        self.assertEqual(clean_description("₹120/-"), "120")

    def test_unrenderable_characters_are_dropped(self):
        self.assertEqual(printable("Hemp भांग Seed"), "Hemp Seed")
        self.assertEqual(
            printable("Rajgira Atta चौलाई/amranth"),
            "Rajgira Atta/amranth",
        )


class BlockTests(TestCase):

    def test_speciality_category_collects_flagged_products(self):
        masala = Category.objects.create(name="MASALE", list_column=1)
        Product.objects.create(name="Ajwain", category=masala, created_by=None)
        Product.objects.create(name="Chai Masala", category=masala, is_speciality=True, created_by=None)
        Category.objects.create(
            name="19No SPECIALITY", shows_speciality=True, list_column=2
        )

        blocks = {block.title: block.items for block in build_blocks()}
        self.assertEqual(blocks["MASALE"], ["Ajwain", "Chai Masala"])
        self.assertEqual(blocks["19NO SPECIALITY"], ["*Chai Masala"])

    def test_unavailable_products_are_left_out(self):
        category = Category.objects.create(name="DAL")
        Product.objects.create(name="Arhar Choti", category=category, created_by=None)
        Product.objects.create(name="Kulth Dal", category=category, available=False, created_by=None)

        self.assertEqual(build_blocks()[0].items, ["Arhar Choti"])

    def test_categories_off_the_list_are_skipped(self):
        category = Category.objects.create(name="HIDDEN", in_item_list=False)
        Product.objects.create(name="Secret", category=category, created_by=None)

        self.assertEqual(build_blocks(), [])

    def test_empty_categories_produce_no_block(self):
        Category.objects.create(name="DAL")
        self.assertEqual(build_blocks(), [])


class LayoutTests(TestCase):

    def block(self, title, count, column=1, order=0):
        class Stub:
            pass

        stub = Stub()
        stub.title = title
        stub.color = "#FFFFFF"
        stub.column = column
        stub.order = order
        stub.items = [f"{title} {index}" for index in range(count)]
        return stub

    def kinds(self, column):
        return [cell.kind for cell in column]

    def test_a_short_block_stays_in_one_column(self):
        columns = lay_out([self.block("DAL", 3)], rows=20)

        self.assertEqual(len(columns), 1)
        self.assertEqual(self.kinds(columns[0])[:5],
                         ["title", "header", "item", "item", "item"])

    def test_an_overlong_block_continues_without_a_second_title(self):
        columns = lay_out([self.block("MASALA", 30)], rows=10)

        self.assertEqual(len(columns), 4)
        self.assertEqual(self.kinds(columns[0])[:2], ["title", "header"])
        self.assertEqual(self.kinds(columns[1])[:2], ["header", "item"])
        placed = sum(cell.kind == "item" for column in columns for cell in column)
        self.assertEqual(placed, 30)

    def test_a_block_never_starts_before_its_assigned_column(self):
        columns = lay_out(
            [self.block("DAL", 2, column=1), self.block("ATTA", 2, column=3)],
            rows=20,
        )

        self.assertEqual(len(columns), 3)
        self.assertEqual(self.kinds(columns[1]), ["gap"] * 20)
        self.assertEqual(columns[2][0].kind, "title")

    def test_a_block_moves_to_the_next_page_rather_than_straddle_one(self):
        columns = lay_out(
            [self.block("DAL", 22), self.block("RICE", 8)], rows=10
        )

        rice = [index for index, column in enumerate(columns)
                if any(cell.text.startswith("RICE") for cell in column)]
        self.assertEqual(rice, [PAIRS_PER_PAGE])
        self.assertEqual(columns[2][-1].kind, "gap")

    def test_a_block_larger_than_a_page_still_splits(self):
        columns = lay_out([self.block("MASALA", 60)], rows=10)

        placed = sum(cell.kind == "item" for column in columns for cell in column)
        self.assertEqual(placed, 60)
        self.assertGreater(len(columns), PAIRS_PER_PAGE)

    def test_columns_are_padded_to_a_uniform_height(self):
        columns = lay_out([self.block("DAL", 3)], rows=20)

        self.assertEqual(len(columns[0]), 20)
        self.assertEqual(columns[0][-1].kind, "gap")

    def test_trailing_padding_keeps_the_block_colour(self):
        block = self.block("DAL", 2)
        block.color = "#F2E686"
        columns = lay_out([block], rows=10)

        self.assertEqual(columns[0][-1].color, "#F2E686")


class RenderTests(TestCase):

    def test_two_column_groups_produce_two_pages(self):
        for index, name in enumerate(["DAL", "MASALE", "RICE", "ATTA"]):
            category = Category.objects.create(
                name=name, list_color="#F2E686", list_column=index * 2 + 1
            )
            Product.objects.create(name=f"Item {name}", category=category, created_by=None)

        target = io.BytesIO()
        pages = render(build_blocks(), target)

        self.assertEqual(pages, 3)
        self.assertTrue(target.getvalue().startswith(b"%PDF"))

    def test_render_emits_a_pdf(self):
        category = Category.objects.create(name="DAL", list_color="#F2E686")
        Product.objects.create(name="Arhar Choti", category=category, created_by=None)

        target = io.BytesIO()
        self.assertEqual(render(build_blocks(), target), 1)
        self.assertTrue(target.getvalue().startswith(b"%PDF"))


class AdminPublishTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_superuser("owner", "owner@example.com", "pw")
        self.client.force_login(self.user)
        category = Category.objects.create(name="DAL", list_color="#F2E686")
        Product.objects.create(name="Arhar Choti", category=category, created_by=None)

    def toolbar(self, response):
        found = re.search(
            r'<ul class="object-tools">.*?</ul>', response.content.decode(), re.S
        )
        self.assertIsNotNone(found, "change list has no object-tools toolbar")
        return found.group(0)

    def test_changelist_offers_a_publish_button_without_selecting_rows(self):
        response = self.client.get(reverse("admin:store_product_changelist"))
        toolbar = self.toolbar(response)

        self.assertIn(reverse("admin:store_product_publish_item_list"), toolbar)
        self.assertIn("Publish item list PDF", toolbar)
        self.assertIn('method="post"', toolbar)
        self.assertIn("csrfmiddlewaretoken", toolbar)

    def test_publishing_is_not_offered_as_a_bulk_action(self):
        response = self.client.get(reverse("admin:store_product_changelist"))

        self.assertNotContains(response, "publish_item_list</option>")

    def test_posting_publishes_and_reports_success(self):
        with patch("store.admin.drive.replace", return_value={"name": "list.pdf"}) as upload:
            response = self.client.post(
                reverse("admin:store_product_publish_item_list"), follow=True
            )

        upload.assert_called_once()
        self.assertEqual(
            [m.level for m in response.context["messages"]], [messages.SUCCESS]
        )
        self.assertInHTML(
            '<li class="success">Published 1 items across 1 blocks '
            '(1 pages) to list.pdf.</li>',
            response.content.decode(),
        )

    def test_a_failed_upload_is_reported_not_raised(self):
        with patch("store.admin.drive.replace", side_effect=ImproperlyConfigured("no key")):
            response = self.client.post(
                reverse("admin:store_product_publish_item_list"), follow=True
            )

        self.assertEqual(
            [m.level for m in response.context["messages"]], [messages.ERROR]
        )
        self.assertInHTML(
            '<li class="error">Upload failed: no key</li>', response.content.decode()
        )

    def test_a_get_publishes_nothing(self):
        with patch("store.admin.drive.replace") as upload:
            response = self.client.get(reverse("admin:store_product_publish_item_list"))

        upload.assert_not_called()
        self.assertRedirects(response, reverse("admin:store_product_changelist"))


class CredentialTests(TestCase):

    def payload(self):
        return json.dumps({"type": "service_account", "client_email": "sa@x.com"})

    def load(self, value):
        with override_settings(GOOGLE_SERVICE_ACCOUNT_JSON=value):
            with patch.object(
                drive.service_account.Credentials,
                "from_service_account_info",
                side_effect=lambda info, scopes: info,
            ):
                return drive.credentials()

    def test_raw_json_is_accepted(self):
        self.assertEqual(self.load(self.payload())["client_email"], "sa@x.com")

    def test_base64_json_is_accepted(self):
        encoded = base64.b64encode(self.payload().encode()).decode()
        self.assertEqual(self.load(encoded)["client_email"], "sa@x.com")

    def test_a_file_path_is_accepted(self):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as handle:
            handle.write(self.payload())
        self.assertEqual(self.load(handle.name)["client_email"], "sa@x.com")

    def test_anything_else_is_rejected(self):
        with self.assertRaises(ImproperlyConfigured):
            self.load("not-json-not-base64-@@@")

    def test_an_empty_setting_is_rejected(self):
        with self.assertRaises(ImproperlyConfigured):
            self.load("")
