# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack ecommerce app for a single local shop ("Khari Baoli / 19onlineshop"). Customers browse products, build a cart, and place an order — which is delivered to the shop owner as a pre-filled **WhatsApp message** rather than going through any payment gateway. There is no customer login; each order creates a fresh `Customer` row.

One Railway service:
- **Backend** — Django + DRF, serving the JSON API at `/store/*`, admin at `/admin/`.
- **Frontend** — Vite + React 19 + TypeScript SPA in `web/`, built to `web/dist/` and served by the same Django process via Whitenoise (assets) + a catch-all view in `core/urls.py` that returns `index.html` so React Router handles client-side routes.

The repo root has `dev.py`, a stdlib-only Python runner (invoked via `uv run dev.py …`) that starts both dev servers together. The frontend has its own `package.json` inside `web/`; there is no root `package.json`.

## Commands

### First-time setup

```bash
uv sync                       # Python deps → .venv
uv run dev.py install-web     # frontend deps → web/node_modules
uv run python manage.py migrate
```

### Dev (both servers, one command)

```bash
uv run dev.py dev      # Django :8000 + Vite :3000 (split-port HMR)
uv run dev.py mobile   # same, bound to 0.0.0.0 for LAN testing
uv run dev.py prod     # vite build + collectstatic + gunicorn on :8000
uv run dev.py deploy   # railway up --detach (uses ~/.railway-token)
```

### Backend only

```bash
uv run python manage.py runserver
uv run python manage.py test store.tests
uv run python manage.py makemigrations && uv run python manage.py migrate
uv run python manage.py createsuperuser
uv add <package>     # add a dep (updates pyproject.toml + uv.lock)
```

### Frontend only

```bash
cd web
npm run dev          # Vite dev server on :3000
npm run build        # production build → dist/
npm run lint         # ESLint
```

### Production build (single Railway service)

`nixpacks.toml` does, in order:
1. `pip install uv && uv sync --no-dev` — Python deps.
2. `cd web && npm ci` — frontend deps.
3. `cd web && npm run build` — Vite production build → `web/dist/`.
4. `uv run python manage.py collectstatic --noinput` — folds `web/dist/` (added via `STATICFILES_DIRS`) into `staticfiles/`.
5. Start: `gunicorn core.wsgi`.

Whitenoise serves the hashed asset URLs (`/assets/*.js`, `/assets/*.css`) and the favicon. Any URL not matched by `/admin/`, `/store/`, `/static/`, or `/media/` falls through to a tiny catch-all view in `core/urls.py` that returns `web/dist/index.html` so React Router takes over (handles `/`, `/checkout`, future routes). One origin, no CORS, no second deployment.

## Architecture

### Backend (`store/`)

**Models** (`store/models.py`):
- `Category` — `name`, `slug`, optional `image` (Cloudinary)
- `Product` — belongs to `Category`. Fields: `name`, `slug`, `description`, `price` (decimal, 0 places), `quantity`, `available`, `image` (Cloudinary), `unit` (one of `KG`, `LTR`, `gm`, `Pc` via `Product.QuantityDenomination`).
- `Customer` — `name`, `address`, `date_created`. A new row is created for **every order** (no dedupe by name/phone).
- `Order` — FK to `Customer`, plus `products` as a **denormalized `JSONField`** holding `[{"product": <name>, "quantity": <str>}, ...]`.
- `OrderItem` — `order`, `product` (FK), `quantity` (string like `"2 KG"`). Created in parallel with the JSON snapshot.

**Both `Order.products` (JSON) and `OrderItem` rows exist simultaneously** — the JSON is the human-readable snapshot used by the admin/WhatsApp message; the relational rows let you query historical sales. Any change to ordering logic must keep both in sync (see `OrderSerializer.create()` in `store/serializers.py`).

**Views** (`store/views.py`) — DRF class-based views, all `AllowAny`:
- `AllCategories.GET` — flat list of categories `[{id, name}]`
- `CategoryListView` — at `/store/category/` returns categories with nested products; at `/store/category/<name>/` returns products in that category
- `ProductsView.GET` — flat list of all products with id/name/category/price
- `OrderView.POST` — creates `Customer` + `Order` + `OrderItem`s in one call via `OrderSerializer.create()`
- `CustomerView.POST` — creates a `Customer` directly (used independently; the order flow no longer needs this since `OrderSerializer` creates the customer inline)

**Serializers** (`store/serializers.py`):
- `OrderSerializer` is the interesting one — accepts a nested `customer` object and a `products` list of `{product: <name>, quantity: <str>}`, then in `create()`: pops both, creates the `Customer`, creates the `Order`, looks up each `Product` by name, creates an `OrderItem`, and finally writes the snapshot back to `order.products` as JSON. Note: lookup is by **product name string**, so renaming a product breaks in-flight orders.

**URLs** (`store/urls.py`) — Django convention, one canonical pattern per endpoint, all with trailing slash:
- `/store/allcategories/` — flat category list
- `/store/category/` — categories with nested products
- `/store/category/<name>/` — products for one category
- `/store/products/` — flat product list
- `/store/order/` — create order
- `/store/customer/` — create customer

`core/urls.py` mounts `store.urls` at `/store/`, `admin.site.urls` at `/admin/`, and a `re_path(r"^(?!admin/|store/|static/|media/).*$", spa)` catch-all that returns the SPA's `index.html` for everything else.

### Database

- **Dev**: SQLite at `./db.sqlite3` (auto-selected when `DEBUG=True`)
- **Prod**: PostgreSQL on Railway, credentials from `.env` (`DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`). User is hardcoded to `postgres`. Switching is purely driven by `DEBUG` in `core/settings.py`.

### Media & static

- **Product / category images** — uploaded via Django admin, stored on **Cloudinary** in non-DEBUG environments (`STORAGES["default"]` → `cloudinary_storage.storage.MediaCloudinaryStorage`). Local dev uses `FileSystemStorage` under `media/`.
- **Static** — Whitenoise with `CompressedManifestStaticFilesStorage` in prod, plain storage in dev.

## Frontend (`web/` — Vite SPA)

### Stack

- **Vite 7** + **React 19** + **TypeScript** — SPA with `BrowserRouter` from `react-router-dom`
- **Zustand** (`zustand` v5) — cart state, persisted to `localStorage` key `"cart"`
- **shadcn/ui + Tailwind v4** — CSS-based config in `src/globals.css` (no `tailwind.config.ts`); uses `@tailwindcss/vite` plugin
- **SWR** — client-side data fetching (the home page loads categories with `useSWR`)
- **@base-ui/react** — primitives layered under shadcn
- **lucide-react** — icons
- **Theme** — green primary (`oklch(0.627 0.175 149.2)`), amber accent (`oklch(0.769 0.188 70.1)`)

### Key files

- `src/main.tsx` — entry point. Mounts `<BrowserRouter>` with two routes: `/` → `HomePage`, `/checkout` → `CheckoutPage`, `*` → `HomePage`.
- `src/lib/types.ts` — shared TypeScript interfaces matching the Django serializers.
- `src/lib/api.ts` — `getCategories()`, `postOrder()` — uses relative URLs (`/store/category/`, `/store/order/`). Vite's `server.proxy` forwards them to Django on `:8000` in dev; prod is single-origin so the same URLs hit Django directly.
- `src/lib/cart-store.ts` — Zustand store + `getUnitsFor()` + `canonicalizeUnit()` + `buildWhatsAppUrl()`.
- `src/components/layout/Header.tsx` — sticky green header with the "19" sun emblem + "Khari Baoli" wordmark, search button, and cart-icon-with-badge.
- `src/components/store/StoreView.tsx` — main interactive store (category chips/sidebar, paginated product list, fullscreen search modal, hero header per category).
- `src/components/store/ProductRow.tsx` — product row with quantity stepper (`[− qty +]`) and a tap-to-cycle unit pill.
- `src/components/cart/CartDrawer.tsx` — slide-in cart with "Place Order" → `navigate('/checkout')`.
- `src/pages/HomePage.tsx` — calls `useSWR('categories', getCategories)`, shows loading spinner / error / `<StoreView>`.
- `src/pages/CheckoutPage.tsx` — order summary + name/address form → POST `/store/order/` → `window.location` to `wa.me/...` URL.

### Cart → order → WhatsApp flow

1. User adjusts quantities on `StoreView` — Zustand updates `cart` (persisted to localStorage).
2. On checkout, `postOrder()` POSTs `{customer, products}` to `/store/order/` — Django creates `Customer` + `Order` + `OrderItem`s.
3. Frontend builds a WhatsApp URL via `buildWhatsAppUrl()` and redirects the browser. The shop owner receives a formatted message and confirms the order out-of-band.

### Unit options per product

```
KG  → [KG, gm]
LTR → [LTR, mL]
gm  → [gm, KG]
Pc  → [Pc]
```

These come from `getUnitsFor()` in `src/lib/cart-store.ts`. `canonicalizeUnit()` maps casing variants (`"Kg"`, `"kg"`, `"L"`, `"GM"`, …) onto the canonical keys so cycling and display stay consistent across data that may have non-canonical units stored. The unit chosen at cart time becomes part of the `quantity` string sent to Django (e.g. `"2 KG"`).

### Env vars

The frontend doesn't need any. `lib/api.ts` uses relative URLs. In dev, `vite.config.ts`'s `server.proxy` forwards `/store/*`, `/admin/*`, and `/media/*` to `http://localhost:8000` verbatim (trailing slashes preserved — unlike Next's rewrites which strip them). In prod, Django serves both the SPA and the API at one origin.

## Tests

Backend tests live in `store/tests/`:
- `test_models.py` — basic `Category` model test
- `test_views.py` — empty placeholder

Run a single test module:

```bash
uv run python manage.py test store.tests.test_models
```

There are no frontend tests yet.

## Conventions and gotchas

- **Product lookup by name** — `OrderSerializer.create()` does `Product.objects.get(name=...)`. Renames can break in-flight orders; prefer creating a new product over renaming.
- **Customer dedupe is intentional** — every order creates a new `Customer` row. Do not "optimize" this without checking with the shop owner; it preserves the address/name as written at order time.
- **Order snapshot is the source of truth for WhatsApp** — `Order.products` (JSON) is what gets rendered to the shop owner. Keep `OrderItem` rows in sync, but don't break the snapshot.
- **DRF perms are wide open** — `AllowAny` everywhere. CORS is `CORS_ORIGIN_ALLOW_ALL = True`. There is no auth on the storefront; admin uses Django's standard auth at `/admin/`.
- **Time zone** — `TIME_ZONE = "Asia/Kolkata"`. Don't change without checking how `Order.order_date` is rendered.
- **`uv` only** — Python deps are in `pyproject.toml` + `uv.lock`. There is no `requirements.txt`. Use `uv add <pkg>`, never `pip install`.
- **Django URL convention** — every `store/` endpoint has a single trailing-slash form; the frontend calls them with the slash (`/store/category/`). Vite's proxy preserves the slash, so no `APPEND_SLASH` redirect loops.

## Key config files

- `core/settings.py` — DB switch on `DEBUG`, Cloudinary storage, `TIME_ZONE = "Asia/Kolkata"`, `ALLOWED_HOSTS`, CORS/CSRF origins, `STATICFILES_DIRS = [web/dist]`.
- `core/urls.py` — mounts `store/` + `admin/` + SPA catch-all `re_path`.
- `store/urls.py` — REST endpoints (single trailing-slash form each).
- `nixpacks.toml` — Railway build (Node + Python deps → vite build → collectstatic → gunicorn).
- `web/vite.config.ts` — port 3000, `server.proxy` to Django, `@` alias, `build.outDir = dist`.
- `web/components.json` — shadcn/ui config.
- `.env` (root, gitignored) — `SECRET_KEY`, `DEBUG`, DB creds, `CLOUDINARY_URL`.
- `~/.railway-token` (outside repo) — Railway API token used by `dev.py deploy`.

## Project layout

```
core/                  Django project (settings, root urls + SPA catch-all, wsgi/asgi)
store/                 Django app: models, views, serializers, admin, migrations, tests
  models.py            Category, Product, Customer, Order, OrderItem
  views.py             DRF class-based views
  serializers.py       OrderSerializer.create() does the heavy lifting
  urls.py              /store/* endpoints (Django convention, trailing slash)
web/                   Vite SPA
  src/
    main.tsx           BrowserRouter + routes
    pages/             HomePage, CheckoutPage
    components/        layout/, store/, cart/, ui/
    lib/               api.ts, cart-store.ts, types.ts, utils.ts
    globals.css        Tailwind v4 + shadcn theme tokens
  vite.config.ts       proxy /store, /admin, /media → :8000
  index.html           SPA shell
media/                 local-only uploads (Cloudinary used in prod)
staticfiles/           collectstatic output (deploy artifact, gitignored)
nixpacks.toml          Railway build
dev.py                 Single-file dev runner (stdlib only)
pyproject.toml         Python deps (uv)
db.sqlite3             dev DB
```
