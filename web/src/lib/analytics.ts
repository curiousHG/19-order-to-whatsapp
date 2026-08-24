import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const MEASUREMENT_ID = "G-LTPTP5WVMK";

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

export function trackOrderThenNavigate(items: TrackedItem[], url: string): void {
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };

  const sent = send("event", "place_order", {
    item_count: items.length,
    items: items
      .map((item) => `${item.quantity} ${item.unit} ${item.name}`)
      .join(", ")
      .slice(0, MAX_PARAM_CHARS),
    event_callback: go,
  });

  if (!sent) {
    go();
    return;
  }

  window.setTimeout(go, NAVIGATE_TIMEOUT_MS);
}
