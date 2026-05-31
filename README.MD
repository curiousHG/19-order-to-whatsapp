# 19-order-to-whatsapp

A full-stack ecommerce app for a local shop. Customers browse the catalog, build a cart, and submit the order to the shop owner via a pre-filled WhatsApp message — no payment gateway, no login.

Live: https://www.19onlineshop.com

## Stack

- **Backend**: Django 5.2 LTS + Django REST Framework, Cloudinary for product images, PostgreSQL in prod / SQLite in dev.
- **Frontend**: Vite + React 19 + TypeScript SPA, React Router for routes, Zustand for cart state (persisted to localStorage), shadcn/ui + Tailwind v4.
- **Deployment**: single Railway service — Django serves the API at `/store/*`, the admin at `/admin/`, and the built SPA (`web/dist/`) at everything else.
- **Tooling**: `uv` for Python deps, `npm` for the frontend, `dev.py` (stdlib-only) to run both dev servers from the repo root.

## Prerequisites

- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Node.js 20+ and npm

## First-time setup

```bash
uv sync                       # Python deps → .venv
uv run dev.py install-web     # frontend deps → web/node_modules
```

Create `.env` at the repo root:

```
SECRET_KEY=your-django-secret
DEBUG=True
```

For production builds, also add `DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and `CLOUDINARY_URL`.

No frontend env file is needed: the Vite dev server proxies `/store/*`, `/admin/*`, and `/media/*` to Django on `:8000` (see `server.proxy` in `web/vite.config.ts`), so the same relative URLs work in both dev and prod.

Apply migrations:

```bash
uv run python manage.py migrate
```

## Run the app

```bash
uv run dev.py dev
```

Starts both servers in one terminal:

- Django (API) → http://localhost:8000
- Vite (UI)   → http://localhost:3000 ← open this

Stop with Ctrl+C; both processes shut down together.

### LAN / mobile testing

```bash
uv run dev.py mobile
```

Binds both servers to `0.0.0.0` so you can hit them from your phone on the same Wi-Fi.

### Single-origin prod-style run

```bash
uv run dev.py prod
```

Builds the SPA, runs `collectstatic`, then serves everything via gunicorn on http://localhost:8000 — matches what Railway runs in production.

### Running servers individually

```bash
# Backend
uv run python manage.py runserver

# Frontend
cd web && npm run dev
```

## Common tasks

```bash
# Django
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py test store.tests
uv add <package>          # add a Python dep

# Frontend
cd web && npm run build   # production build → web/dist/
cd web && npm run lint    # ESLint
```

## Deployment (single Railway service)

`nixpacks.toml` installs Node + Python deps, runs `cd web && npm run build` to produce `web/dist/` (Vite SPA bundle), then `collectstatic` to fold the bundle into `staticfiles/`. Whitenoise serves the static assets at the root; Django's catch-all view in `core/urls.py` serves `web/dist/index.html` for any client-side route so React Router can take over. Django keeps owning `/store/*` and `/admin/`.

Required Railway env vars:

```
SECRET_KEY=<random>
DEBUG=False
DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT
CLOUDINARY_URL=<from cloudinary>
```

To preview a branch without touching prod, add a second service in the same Railway project pointing at the same Postgres (test data will mix with prod; clean it from `/admin/` after).

## Project layout

```
core/      Django project (settings, root urls, SPA catch-all view)
store/     Django app — models, views, serializers, migrations
web/       Vite SPA
  src/
    main.tsx          entry point (BrowserRouter + routes)
    pages/            HomePage, CheckoutPage
    components/       layout/, store/, cart/, ui/
    lib/              api.ts, cart-store.ts, types.ts, utils.ts
    globals.css       Tailwind v4 + shadcn theme
  vite.config.ts      proxy /store, /admin, /media → :8000
  index.html          SPA shell
dev.py         Single-file dev runner (stdlib only)
nixpacks.toml  Railway build config
pyproject.toml Python deps (managed by uv)
```

See `CLAUDE.md` for architecture notes (models, request flow, conventions).
