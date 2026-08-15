#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Dev runner for the Vite SPA (web/) + Django backend.

Usage:
    uv run dev.py dev          # Django :8000 + Vite :3000 (split-port HMR)
    uv run dev.py mobile       # same, bound to 0.0.0.0 for LAN testing
    uv run dev.py prod         # vite build + collectstatic + gunicorn on :8000
    uv run dev.py install-web  # install web/ npm deps
    uv run dev.py deploy       # railway up --detach (uses ~/.railway-token)
    uv run dev.py db-sync      # overwrite the local DB with a copy of production
"""
from __future__ import annotations

import argparse
import json
import os
import signal
import subprocess
import sys
import tempfile
import threading
import time
from dataclasses import dataclass, field

COLORS = {"blue": "\033[34m", "green": "\033[32m", "red": "\033[31m", "reset": "\033[0m"}


@dataclass
class Proc:
    name: str
    color: str
    cmd: list[str]
    cwd: str | None = None
    env: dict[str, str] = field(default_factory=dict)


def stream(proc: subprocess.Popen, name: str, color: str) -> None:
    prefix = f"{COLORS[color]}[{name}]{COLORS['reset']}"
    assert proc.stdout is not None
    for line in iter(proc.stdout.readline, b""):
        sys.stdout.write(f"{prefix} {line.decode(errors='replace')}")
        sys.stdout.flush()


def run_concurrent(procs: list[Proc]) -> int:
    children: list[subprocess.Popen] = []
    for p in procs:
        env = os.environ.copy()
        env.update(p.env)
        proc = subprocess.Popen(
            p.cmd, cwd=p.cwd, env=env,
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            start_new_session=True,
        )
        children.append(proc)
        threading.Thread(target=stream, args=(proc, p.name, p.color), daemon=True).start()

    shutting_down = False

    def shutdown(*_):
        nonlocal shutting_down
        if shutting_down:
            return
        shutting_down = True
        for c in children:
            if c.poll() is None:
                try:
                    os.killpg(os.getpgid(c.pid), signal.SIGTERM)
                except ProcessLookupError:
                    pass
        deadline = time.time() + 5
        for c in children:
            try:
                c.wait(timeout=max(0.1, deadline - time.time()))
            except subprocess.TimeoutExpired:
                try:
                    os.killpg(os.getpgid(c.pid), signal.SIGKILL)
                except ProcessLookupError:
                    pass

    signal.signal(signal.SIGINT, lambda *_: (shutdown(), sys.exit(130)))
    signal.signal(signal.SIGTERM, lambda *_: (shutdown(), sys.exit(143)))

    while all(c.poll() is None for c in children):
        time.sleep(0.2)

    shutdown()
    return max((c.returncode or 0) for c in children)


def run_sequential(steps: list[Proc]) -> int:
    for s in steps:
        env = os.environ.copy()
        env.update(s.env)
        print(f"{COLORS[s.color]}[{s.name}]{COLORS['reset']} $ {' '.join(s.cmd)}", flush=True)
        rc = subprocess.call(s.cmd, cwd=s.cwd, env=env)
        if rc != 0:
            print(f"{COLORS['red']}[{s.name}] exited with code {rc}{COLORS['reset']}", flush=True)
            return rc
    return 0


def cmd_dev(host: str = "127.0.0.1") -> int:
    vite_cmd = ["npm", "run", "dev", "--"]
    if host != "127.0.0.1":
        vite_cmd += ["--host", host]
    return run_concurrent([
        Proc("django", "blue", ["uv", "run", "python", "manage.py", "runserver", f"{host}:8000"]),
        Proc("vite", "green", vite_cmd, cwd="web"),
    ])


def cmd_prod() -> int:
    return run_sequential([
        Proc("build",   "green", ["npm", "run", "build"], cwd="web"),
        Proc("collect", "blue",  ["uv", "run", "python", "manage.py", "collectstatic", "--noinput", "--clear"]),
        Proc("serve",   "blue",  ["uv", "run", "gunicorn", "core.wsgi", "--bind", "127.0.0.1:8000"], env={"ENVIRONMENT": "production"}),
    ])


def cmd_install_web() -> int:
    return subprocess.call(["npm", "install"], cwd="web")


def cmd_deploy() -> int:
    """Deploy to the Railway service this directory is `railway link`ed to.

    Reads the token from ~/.railway-token (kept out of the repo). Project /
    environment / service IDs come from the prior `railway link` saved in
    ~/.railway/config.json — re-run `railway link` to switch targets.
    """
    token_path = os.path.expanduser("~/.railway-token")
    if not os.path.isfile(token_path):
        print(
            f"{COLORS['red']}Missing {token_path}{COLORS['reset']}\n"
            "Save your Railway account token there first:\n"
            "  echo 'YOUR_TOKEN' > ~/.railway-token && chmod 600 ~/.railway-token",
            file=sys.stderr,
        )
        return 1
    env = os.environ.copy()
    env["RAILWAY_API_TOKEN"] = open(token_path).read().strip()
    print(f"{COLORS['blue']}[deploy]{COLORS['reset']} $ railway up --detach", flush=True)
    return subprocess.call(["railway", "up", "--detach"], env=env)


PG16_BIN = "/opt/homebrew/opt/postgresql@16/bin"
PROD_SERVICE = "19-order-to-whatsapp"


def _local_db() -> dict[str, str]:
    """Read the development database settings from .env."""
    cfg: dict[str, str] = {}
    if os.path.isfile(".env"):
        for line in open(".env"):
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1)
                cfg[k.strip()] = v.strip()
    return {
        "name": cfg.get("DB_NAME", "19shopdb"),
        "user": cfg.get("DB_USER", os.environ.get("USER", "postgres")),
        "host": cfg.get("DB_HOST", "localhost"),
        "port": cfg.get("DB_PORT", "5432"),
    }


def _prod_db() -> dict[str, str] | None:
    """Fetch production credentials from Railway at call time, never stored."""
    out = subprocess.run(
        ["railway", "variables", "-s", PROD_SERVICE, "--json"],
        capture_output=True, text=True,
    )
    if out.returncode != 0:
        print(f"{COLORS['red']}railway variables failed. Run `railway link` first.{COLORS['reset']}",
              file=sys.stderr)
        return None
    raw = out.stdout[out.stdout.find("{"):]
    try:
        v = json.loads(raw)
    except json.JSONDecodeError:
        print(f"{COLORS['red']}Could not parse railway output.{COLORS['reset']}", file=sys.stderr)
        return None
    missing = [k for k in ("DB_HOST", "DB_PORT", "DB_NAME", "DB_PASSWORD") if k not in v]
    if missing:
        print(f"{COLORS['red']}Railway is missing {', '.join(missing)}.{COLORS['reset']}",
              file=sys.stderr)
        return None
    return {"host": v["DB_HOST"], "port": v["DB_PORT"],
            "name": v["DB_NAME"], "password": v["DB_PASSWORD"]}


def cmd_db_sync() -> int:
    """Replace the local database with a fresh copy of production.

    Uses the postgresql@16 client tools: pg_dump refuses to read a server
    newer than itself, and prod is 16 while the local server is 15.
    """
    pg_dump = os.path.join(PG16_BIN, "pg_dump")
    pg_restore = os.path.join(PG16_BIN, "pg_restore")
    if not os.path.isfile(pg_dump):
        print(f"{COLORS['red']}Missing {pg_dump}{COLORS['reset']}\n"
              "  brew install postgresql@16", file=sys.stderr)
        return 1

    prod = _prod_db()
    if prod is None:
        return 1
    local = _local_db()

    print(f"{COLORS['blue']}[db-sync]{COLORS['reset']} {prod['host']}  →  "
          f"{local['host']}:{local['port']}/{local['name']}", flush=True)

    with tempfile.TemporaryDirectory() as tmp:
        dump = os.path.join(tmp, "prod.dump")
        env = os.environ.copy()
        env["PGPASSWORD"] = prod["password"]
        print(f"{COLORS['blue']}[db-sync]{COLORS['reset']} dumping production…", flush=True)
        rc = subprocess.call(
            [pg_dump, "-h", prod["host"], "-p", str(prod["port"]), "-U", "postgres",
             "-d", prod["name"], "--format=custom", "--no-owner", "--no-privileges",
             "-f", dump],
            env=env,
        )
        if rc != 0:
            print(f"{COLORS['red']}[db-sync] dump failed{COLORS['reset']}", file=sys.stderr)
            return rc

        print(f"{COLORS['blue']}[db-sync]{COLORS['reset']} recreating {local['name']}…", flush=True)
        # An open psql or runserver connection blocks DROP DATABASE.
        terminate = (
            "SELECT pg_terminate_backend(pid) FROM pg_stat_activity "
            f"WHERE datname = '{local['name']}' AND pid <> pg_backend_pid()"
        )
        for sql in (terminate,
                    f'DROP DATABASE IF EXISTS "{local["name"]}"',
                    f'CREATE DATABASE "{local["name"]}"'):
            rc = subprocess.call(["psql", "-h", local["host"], "-p", local["port"],
                                  "-U", local["user"], "-d", "postgres", "-c", sql])
            if rc != 0:
                print(f"{COLORS['red']}[db-sync] {sql} failed{COLORS['reset']}", file=sys.stderr)
                return rc

        print(f"{COLORS['blue']}[db-sync]{COLORS['reset']} restoring…", flush=True)
        rc = subprocess.call(
            [pg_restore, "-h", local["host"], "-p", local["port"], "-U", local["user"],
             "-d", local["name"], "--no-owner", "--no-privileges", dump]
        )
        if rc != 0:
            print(f"{COLORS['red']}[db-sync] restore failed{COLORS['reset']}", file=sys.stderr)
            return rc

    print(f"{COLORS['green']}[db-sync] done{COLORS['reset']}", flush=True)
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Dev runner for the ecommerce repo")
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("dev", help="Django :8000 + Vite :3000 (split-port HMR)")
    sub.add_parser("mobile", help="same as dev, bound to 0.0.0.0 for LAN testing")
    sub.add_parser("prod", help="vite build + collectstatic + gunicorn on :8000")
    sub.add_parser("install-web", help="run npm install in web/")
    sub.add_parser("deploy", help="railway up --detach to the linked service")
    sub.add_parser("db-sync", help="replace the local database with a copy of production")
    args = parser.parse_args()

    return {
        "dev": lambda: cmd_dev("127.0.0.1"),
        "mobile": lambda: cmd_dev("0.0.0.0"),
        "prod": cmd_prod,
        "install-web": cmd_install_web,
        "deploy": cmd_deploy,
        "db-sync": cmd_db_sync,
    }[args.cmd]()


if __name__ == "__main__":
    sys.exit(main())
