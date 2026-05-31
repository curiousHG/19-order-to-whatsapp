#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Dev runner — replaces the root package.json scripts.

Usage:
    uv run dev.py dev          # Django :8000 + Next :3000 (split-port HMR)
    uv run dev.py mobile       # same, bound to 0.0.0.0 for LAN testing
    uv run dev.py prod         # single-origin: next build + collectstatic + gunicorn
    uv run dev.py install-web  # install web/ npm deps
"""
from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
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
    next_cmd = ["npm", "run", "dev", "--"]
    if host != "127.0.0.1":
        next_cmd += ["--hostname", host]
    return run_concurrent([
        Proc("django", "blue", ["uv", "run", "python", "manage.py", "runserver", f"{host}:8000"]),
        Proc("nextjs", "green", next_cmd, cwd="web"),
    ])


def cmd_prod() -> int:
    return run_sequential([
        Proc("build",   "green", ["npm", "run", "build"], cwd="web", env={"NEXT_PUBLIC_API_URL": ""}),
        Proc("collect", "blue",  ["uv", "run", "python", "manage.py", "collectstatic", "--noinput", "--clear"]),
        Proc("serve",   "blue",  ["uv", "run", "gunicorn", "core.wsgi", "--bind", "127.0.0.1:8000"], env={"DEBUG": "False"}),
    ])


def cmd_install_web() -> int:
    return subprocess.call(["npm", "install"], cwd="web")


def main() -> int:
    parser = argparse.ArgumentParser(description="Dev runner for the ecommerce repo")
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("dev", help="Django :8000 + Next :3000 (split-port HMR)")
    sub.add_parser("mobile", help="same as dev, bound to 0.0.0.0 for LAN testing")
    sub.add_parser("prod", help="build Next + collectstatic + gunicorn on :8000")
    sub.add_parser("install-web", help="run npm install in web/")
    args = parser.parse_args()

    return {
        "dev": lambda: cmd_dev("127.0.0.1"),
        "mobile": lambda: cmd_dev("0.0.0.0"),
        "prod": cmd_prod,
        "install-web": cmd_install_web,
    }[args.cmd]()


if __name__ == "__main__":
    sys.exit(main())
