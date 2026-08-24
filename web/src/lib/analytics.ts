import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const MEASUREMENT_ID = "G-LTPTP5WVMK";
export const ADS_CONVERSION_ID = "AW-18386355482";

const ADS_CONVERSION_SEND_TO = `${ADS_CONVERSION_ID}/FG9YCP3AguccEJqKpr9E`;
const NAVIGATE_TIMEOUT_MS = 1200;
const MAX_PARAM_CHARS = 100;

function send(...args: unknown[]): boolean {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
  window.gtag(...args);
  return true;
}

export function trackPageView(path: string): void {
  send("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function useAnalyticsPageViews(): void {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (lastPath.current === path) return;
    lastPath.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);
}

interface TrackedItem {
  name: string;
  quantity: number;
  unit: string;
}

function newTransactionId(): string {
  const c = typeof window !== "undefined" ? window.crypto : undefined;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function summarize(items: TrackedItem[]): string {
  return items
    .map((item) => `${item.quantity} ${item.unit} ${item.name}`)
    .join(", ")
    .slice(0, MAX_PARAM_CHARS);
}

export function trackOrderThenNavigate(items: TrackedItem[], url: string): void {
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };

  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    go();
    return;
  }

  const transactionId = newTransactionId();
  let pending = 2;
  const settle = () => {
    pending -= 1;
    if (pending <= 0) go();
  };

  send("event", "place_order", {
    item_count: items.length,
    items: summarize(items),
    transaction_id: transactionId,
    event_callback: settle,
  });

  send("event", "conversion", {
    send_to: ADS_CONVERSION_SEND_TO,
    transaction_id: transactionId,
    event_callback: settle,
  });

  window.setTimeout(go, NAVIGATE_TIMEOUT_MS);
}
