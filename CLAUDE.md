# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack ecommerce app for a local shop. Django REST backend + React frontend bundled via Vite into Django's static files. Orders are submitted to the shop owner via WhatsApp.

## Commands

### Dev (single command)

```bash
npm run dev    # starts Django (port 8000) + Vite watch simultaneously via concurrently
```

### Backend only

```bash
uv run python manage.py runserver
uv run python manage.py test store.tests
uv run python manage.py makemigrations && uv run python manage.py migrate
uv add <package>           # add a dependency (updates pyproject.toml + uv.lock)
```

### Frontend only

```bash
cd frontend
npm run dev    # vite build --watch (rebuilds on file change)
npm run build  # one-time production build
```

### Production build (Railway handles this via nixpacks.toml)

```bash
cd frontend && npm run build
uv run python manage.py collectstatic --noinput
```

## Architecture

### Backend (`store/`)

- **Models**: `Category` → `Product` (with unit type: KG/LTR/gm), `Customer`, `Order` (products stored as JSONField), `OrderItem`
- **Views**: Class-based DRF views. `OrderView.POST` atomically creates Customer + Order + OrderItems in one request
- **Serializers**: `OrderSerializer` has a custom `create()` that handles the full order creation flow

URL structure:
- `/store/allcategories` — category list only
- `/store/category` — categories with nested products
- `/store/products/` — all products
- `/store/order` — create order (POST)
- `/store/customer` — create customer (POST)

### Frontend (`frontend/src/`)

React 18 + react-router-dom v6. Pages are lazy-loaded via `React.lazy` / `Suspense`.

**Page flow:**
1. `OrderPage` — browse categories/products, add to cart (state + localStorage)
2. `FinalPage` — review order, enter name/address, submit → calls `postOrder()` API, then redirects to WhatsApp (`wa.me/919811572962`) with order details in the message
3. `BillPage` — bill/invoice management
4. `PricePage` — price management (minimal)

**API calls** live in `frontend/src/api/` — plain functions using Axios, one file per endpoint.

**Note:** All `.js` files in `frontend/src/` contain JSX. Vite is configured (via a pre-transform plugin in `vite.config.js`) to handle JSX in `.js` files without needing to rename them to `.jsx`.

### Static File Bundling

Vite outputs to `frontend/static/frontend/` with a predictable filename `main.js` (no content hash). Django's `{% static 'frontend/main.js' %}` in the template resolves this. In production, WhiteNoise's `CompressedManifestStaticFilesStorage` handles compression and content-hashed URLs transparently via the manifest.

### Database

- Development: SQLite3 (`db.sqlite3`)
- Production: PostgreSQL on Railway (credentials via `.env`). Switching is controlled by `DEBUG` in `.env`.

## Python Dependencies

Managed by `uv` via `pyproject.toml` (not `requirements.txt`). The `.venv` is at the project root.

## Key Config

- `core/settings.py`: `TIME_ZONE = "Asia/Kolkata"`, `CORS_ORIGIN_ALLOW_ALL = True`
- `core/urls.py`: Frontend routes served at `/`, API at `/store/*`
- `.env`: `SECRET_KEY`, `DEBUG`, PostgreSQL credentials, `CLOUDINARY_URL`
- `nixpacks.toml`: Railway/Nixpacks deployment config — runs `uv sync`, builds frontend, runs `collectstatic`
