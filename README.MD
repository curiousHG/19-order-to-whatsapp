# 19-order-to-whatsapp
https://www.19onlineshop.com

## Setup

**Prerequisites:** [uv](https://docs.astral.sh/uv/getting-started/installation/) and Node.js installed.

```bash
# Install Python dependencies
uv sync

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install root dev tooling
npm install
```

## Running the project

```bash
npm run dev
```

This starts both the Django backend (port 8000) and the Vite frontend watcher in one terminal.

## Individual commands

```bash
# Backend only
uv run python manage.py runserver

# Frontend build (watch mode)
cd frontend && npm run dev

# Run Django tests
uv run python manage.py test store.tests

# Add a Python package
uv add <package-name>
```

## Environment variables

Create a `.env` file in the project root:

```
SECRET_KEY=your-secret-key
DEBUG=True
```

For production, also add `DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` for PostgreSQL.
