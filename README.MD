# 19-order-to-whatsapp

A full-stack ecommerce app for a local shop. Customers browse the catalog, build a cart, and submit the order to the shop owner via a pre-filled WhatsApp message — no payment gateway, no login.

Live: https://www.19onlineshop.com

## Stack

- **Backend**: Django 3 + Django REST Framework, Cloudinary for product images, PostgreSQL in prod / SQLite in dev.
- **Frontend**: Next.js 16 (App Router, React 19, TypeScript) statically exported, Zustand for cart state, shadcn/ui + Tailwind v4.
- **Deployment**: single Railway service — Django serves the API at `/store/*` and the exported Next.js build at `/`.
- **Tooling**: `uv` for Python deps, `npm` for the frontend, `concurrently` to run both dev servers from the repo root.

## Prerequisites

- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Node.js 18+ and npm

## First-time setup

```bash
uv sync                # Python deps → .venv
npm install            # installs concurrently at the repo root
npm run install:web    # frontend deps → web/node_modules
```

Create `.env` at the repo root:

```
SECRET_KEY=your-django-secret
DEBUG=True
```

For production builds, also add `DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, and `CLOUDINARY_URL`.

Create `web/.env.local` so the frontend can reach the API in dev (the dev workflow runs two servers on different ports):

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

In production the UI and API share the same Railway origin, so `NEXT_PUBLIC_API_URL` is set to an empty string on Railway and the static bundle issues relative requests (e.g. `/store/category`).

Apply migrations:

```bash
uv run python manage.py migrate
```

## Run the app

```bash
npm run dev
```

Starts both servers via `concurrently`:

- Django (API) → http://localhost:8000
- Next.js (UI) → http://localhost:3000 ← open this

Stop with Ctrl+C; both processes shut down together.

### LAN / mobile testing

```bash
npm run dev:mobile
```

Binds both servers to `0.0.0.0` so you can hit them from your phone on the same Wi-Fi.

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
cd web && npm run build   # production build
cd web && npm run lint    # ESLint
```

## Deployment (single Railway service)

`nixpacks.toml` installs Node + Python deps, runs `cd web && npm run build` to produce `web/out/` (Next.js static export), then `collectstatic` to fold the export into `staticfiles/`. Whitenoise serves the static bundle at `/` (with `WHITENOISE_INDEX_FILE = True` so directory URLs resolve to `index.html`); Django keeps owning `/store/*` and `/admin/`.

Required Railway env vars:

```
SECRET_KEY=<random>
DEBUG=False
NEXT_PUBLIC_API_URL=          # empty → relative API calls (same origin)
DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT
CLOUDINARY_URL=<from cloudinary>
```

To preview a branch without touching prod, add a second service in the same Railway project pointing at the same Postgres (test data will mix with prod; clean it from `/admin/` after).

## Project layout

```
core/      Django project (settings, root urls)
store/     Django app — models, views, serializers, migrations
web/       Next.js frontend
  app/         App Router pages (page.tsx, checkout/, layout.tsx)
  components/  cart/, checkout/, layout/, store/, ui/
  lib/         api.ts, cart-store.ts, types.ts, utils.ts
nixpacks.toml  Railway build config
package.json   Root dev scripts (concurrently)
pyproject.toml Python deps (managed by uv)
```

See `CLAUDE.md` for architecture notes (models, request flow, conventions).
