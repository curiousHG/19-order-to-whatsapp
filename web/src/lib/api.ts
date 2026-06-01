import type { Category, OrderRequest } from "./types";

// Same-origin relative URLs. In dev, Vite's server.proxy forwards /store/* to
// Django on :8000 (preserving the trailing slash verbatim). In prod, Django
// serves both the API and the SPA from one origin.

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("/store/category/", { cache: "no-store" });
  if (!res.ok) {
    const msg = await describeError(res, "Failed to fetch categories");
    console.error("[getCategories]", msg);
    throw new Error(msg);
  }
  return res.json();
}

export interface Me {
  authenticated: boolean;
  name?: string;
  email?: string;
}

// Cookies needed so the session is read. credentials defaults to same-origin
// in browsers but we ask explicitly to be safe.
export async function getMe(): Promise<Me> {
  const res = await fetch("/store/me/", {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!res.ok) return { authenticated: false };
  return res.json();
}

export async function postOrder(data: OrderRequest): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/store/order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    const msg = `Network error: ${err instanceof Error ? err.message : String(err)}`;
    console.error("[postOrder]", msg);
    throw new Error(msg);
  }
  if (!res.ok) {
    const msg = await describeError(res, "Could not submit order");
    console.error("[postOrder]", msg);
    throw new Error(msg);
  }
}

// Build a user-friendly, never-empty error string from a non-2xx Response.
// Tries Django's `{ detail }` first, then DRF's `{ field: [errs] }`, then
// raw text body, finally falls back to "<reason> (HTTP <status>)" so the
// user always sees *something* concrete (an HTTP code is better than nothing).
async function describeError(res: Response, reason: string): Promise<string> {
  const status = `HTTP ${res.status}`;
  let body: unknown;
  try {
    const text = await res.text();
    if (!text) return `${reason} (${status})`;
    try {
      body = JSON.parse(text);
    } catch {
      // Body is not JSON (e.g. Django's HTML error page). Strip tags + trim.
      const stripped = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return stripped ? `${stripped} (${status})` : `${reason} (${status})`;
    }
  } catch {
    return `${reason} (${status})`;
  }

  if (typeof body === "string" && body) return `${body} (${status})`;
  if (body && typeof body === "object") {
    const obj = body as Record<string, unknown>;
    if (typeof obj.detail === "string" && obj.detail) {
      return `${obj.detail} (${status})`;
    }
    const lines: string[] = [];
    for (const [key, val] of Object.entries(obj)) {
      const text = Array.isArray(val) ? val.join(", ") : String(val);
      if (text) lines.push(`${key}: ${text}`);
    }
    if (lines.length > 0) return `${lines.join(" · ")} (${status})`;
  }
  return `${reason} (${status})`;
}
