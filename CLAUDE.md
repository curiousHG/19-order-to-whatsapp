# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack ecommerce app for a single local shop ("19onlineshop"). Customers browse products, build a cart, and place an order — which is delivered to the shop owner as a pre-filled **WhatsApp message** rather than going through any payment gateway. There is no customer login; each order also creates a fresh `Customer` row.

Two deployments:
- **Backend** — Django + DRF on Railway, serving the JSON API at `/store/*`.
- **Frontend** — Next.js 16 statically exported (`output: "export"`) and served by the same Django/Whitenoise process; same origin as the API in prod.

The repo's root `package.json` exists only to run both dev servers together via `concurrently` — the frontend has its own `package.json` inside `web/`.

## Commands

### First-time setup

```bash
uv sync                    # Python deps → .venv
npm install                # root: installs concurrently
npm run install:web        # frontend deps → web/node_modules
uv run python manage.py migrate
```

### Dev (both servers, one command)

```bash
npm run dev          # Django :8000 + Next.js :3000
npm run dev:mobile   # same, bound to 0.0.0.0 for LAN testing
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
npm run dev          # Next.js dev server on :3000
npm run build        # production build
npm run lint         # ESLint
```

### Production build (single Railway service)

`nixpacks.toml` does, in order:
1. `pip install uv && uv sync --no-dev` — Python deps.
2. `cd web && npm ci` — frontend deps.
3. `cd web && npm run build` — Next.js static export → `web/out/` (because `next.config.ts` sets `output: "export"` + `trailingSlash: true`).
4. `uv run python manage.py collectstatic --noinput` — folds `web/out/` (added via `STATICFILES_DIRS`) into `staticfiles/`.
5. Start: `gunicorn core.wsgi`.

Whitenoise serves `/` from the static bundle (`WHITENOISE_INDEX_FILE = True` makes `/checkout/` resolve to `out/checkout/index.html`, etc.). Django keeps owning `/store/*` and `/admin/`. The whole app runs on one origin → no CORS in prod, no second deployment to coordinate.

There is no Vercel deployment. The `web/vercel.json` file has been removed.

## Architecture

### Backend (`store/`)

**Models** (`store/models.py`):
- `Category` — `name`, `slug`
- `Product` — belongs to `Category`. Fields: `name`, `slug`, `description`, `price` (decimal, 0 places), `quantity`, `available`, `image` (Cloudinary), `unit` (one of `KG`, `LTR`, `gm`, `Pc` via `Product.QuantityDenomination`).
- `Customer` — `name`, `address`, `date_created`. A new row is created for **every order** (no dedupe by name/phone).
- `Order` — FK to `Customer`, plus `products` as a **denormalized `JSONField`** holding `[{"product": <name>, "quantity": <str>}, ...]`.
- `OrderItem` — `order`, `product` (FK), `quantity` (string like `"2 KG"`). Created in parallel with the JSON snapshot.

**Both `Order.products` (JSON) and `OrderItem` rows exist simultaneously** — the JSON is the human-readable snapshot used by the admin/WhatsApp message; the relational rows let you query historical sales. Any change to ordering logic must keep both in sync (see `OrderSerializer.create()` in `store/serializers.py`).

**Views** (`store/views.py`) — DRF class-based views, all `AllowAny`:
- `AllCategories.GET` — flat list of categories `[{id, name}]`
- `CategoryListView` — at `/store/category/` returns categories with nested products; at `/store/category/<name>` returns products in that category
- `ProductsView.GET` — flat list of all products with id/name/category/price
- `OrderView.POST` — creates `Customer` + `Order` + `OrderItem`s in one call via `OrderSerializer.create()`
- `CustomerView.POST` — creates a `Customer` directly (used independently; the order flow no longer needs this since `OrderSerializer` creates the customer inline)

**Serializers** (`store/serializers.py`):
- `OrderSerializer` is the interesting one — accepts a nested `customer` object and a `products` list of `{product: <name>, quantity: <str>}`, then in `create()`: pops both, creates the `Customer`, creates the `Order`, looks up each `Product` by name, creates an `OrderItem`, and finally writes the snapshot back to `order.products` as JSON. Note: lookup is by **product name string**, so renaming a product breaks in-flight orders.

**URLs**:
- `core/urls.py` mounts `store.urls` under `/store/` (and `admin/`). There is **no Django frontend route** — Next.js owns the UI.
- `store/urls.py` exposes:
  - `/store/allcategories` — flat category list
  - `/store/category/` — categories with nested products
  - `/store/category/<name>` — products for one category
  - `/store/products/` — flat product list
  - `/store/order` (and `/store/order/`) — create order
  - `/store/customer` — create customer

### Database

- **Dev**: SQLite at `./db.sqlite3` (auto-selected when `DEBUG=True`)
- **Prod**: PostgreSQL on Railway, credentials from `.env` (`DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`). User is hardcoded to `postgres`. Switching is purely driven by `DEBUG` in `core/settings.py`.

### Media & static

- **Product images** — uploaded via Django admin, stored on **Cloudinary** (`DEFAULT_FILE_STORAGE = cloudinary_storage.storage.MediaCloudinaryStorage`). `CLOUDINARY_URL` env var.
- **Static** — Whitenoise with `CompressedManifestStaticFilesStorage` in prod, plain storage in dev.

## Frontend (`web/` — Next.js 16, TypeScript, statically exported)

> ⚠️ `web/CLAUDE.md` (which inherits from `web/AGENTS.md`) warns: **"This is NOT the Next.js you know"** — there are breaking changes in 16 vs older versions. Consult `web/node_modules/next/dist/docs/` before writing Next.js code rather than relying on training-data conventions.

### Stack

- **Next.js 16** App Router — Server Components fetch data, Client Components handle interactivity
- **React 19**
- **Zustand** (`zustand` v5) — cart state, persisted to `localStorage` key `"cart"`
- **shadcn/ui + Tailwind v4** — CSS-based config in `app/globals.css` (no `tailwind.config.ts`)
- **SWR** — client-side data fetching where used
- **@base-ui/react** — primitives layered under shadcn
- **Theme** — green primary (`oklch(0.627 0.175 149.2)`), amber accent (`oklch(0.769 0.188 70.1)`)

### Key files

- `lib/types.ts` — shared TypeScript interfaces matching the Django serializers
- `lib/api.ts` — `getCategories()`, `postOrder()` — base URL from `NEXT_PUBLIC_API_URL`
- `lib/cart-store.ts` — Zustand store + `getUnitsFor()` helper + `buildWhatsAppUrl()` (constructs the `wa.me/...?text=...` link from the cart)
- `components/store/StoreView.tsx` — main interactive store (client component)
- `components/store/ProductRow.tsx` — quantity input + unit selector per product
- `components/cart/CartDrawer.tsx` — cart sheet with "Place Order" button
- `app/page.tsx` — client component that fetches categories via SWR (must be client-side because the app is statically exported)
- `app/checkout/page.tsx` — review + name/address form → submit → WhatsApp redirect

### Cart → order → WhatsApp flow

1. User adjusts quantities on `StoreView` — Zustand updates `cart` (persisted).
2. On checkout, `postOrder()` POSTs `{customer, products}` to `/store/order` — Django creates `Customer` + `Order` + `OrderItem`s.
3. Frontend builds a WhatsApp URL via `buildWhatsAppUrl()` and redirects the browser. The shop owner receives a formatted message and confirms the order out-of-band.

### Unit options per product

```
KG  → [KG, gm]
LTR → [LTR, mL]
gm  → [gm, KG]
Pc  → [Pc]
```

These come from `getUnitsFor()` in `lib/cart-store.ts`. The unit chosen at cart time becomes part of the `quantity` string sent to Django (e.g. `"2 KG"`).

### Env vars

```
NEXT_PUBLIC_API_URL=http://localhost:8000   # dev (web/.env.local) — split-port
NEXT_PUBLIC_API_URL=                        # prod (Railway) — empty → same-origin relative URLs
```

`lib/api.ts` uses `process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'` so an empty string is honored as "same origin" (it would have been overridden by `||`).

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
- **Next.js 16 is new** — see `web/AGENTS.md`. APIs may differ from older docs; check `web/node_modules/next/dist/docs/` first.

## Key config files

- `core/settings.py` — DB switch on `DEBUG`, Cloudinary storage, `TIME_ZONE = "Asia/Kolkata"`, `ALLOWED_HOSTS`, CORS/CSRF origins
- `core/urls.py` — mounts `store/` and `admin/`; nothing else
- `store/urls.py` — REST endpoints
- `nixpacks.toml` — Railway build (`uv sync` + `collectstatic`)
- `web/next.config.ts`, `web/components.json`, `web/postcss.config.mjs` — Next/shadcn/Tailwind config
- `.env` (root, gitignored) — `SECRET_KEY`, `DEBUG`, DB creds, `CLOUDINARY_URL`
- `web/.env.local` (gitignored) — `NEXT_PUBLIC_API_URL`

## Project layout

```
core/                  Django project (settings, root urls, wsgi/asgi)
store/                 Django app: models, views, serializers, admin, migrations, tests
  models.py            Category, Product, Customer, Order, OrderItem
  views.py             DRF class-based views
  serializers.py       OrderSerializer.create() does the heavy lifting
  urls.py              /store/* endpoints
web/                   Next.js 16 frontend
  app/                 App Router (page.tsx, checkout/, layout.tsx, globals.css)
  components/          cart/, checkout/, layout/, store/, ui/
  lib/                 api.ts, cart-store.ts, types.ts, utils.ts
  CLAUDE.md / AGENTS.md  Next.js 16 caveat
media/                 local-only uploads (Cloudinary is used in prod)
staticfiles/           collectstatic output (deploy artifact)
nixpacks.toml          Railway build
package.json           root dev scripts (concurrently)
pyproject.toml         Python deps (uv)
db.sqlite3             dev DB
```
