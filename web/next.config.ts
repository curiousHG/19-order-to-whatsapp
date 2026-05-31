import type { NextConfig } from "next";
import path from "path";

// `output: "export"` + `trailingSlash: true` are build-time concerns —
// they emit out/<route>/index.html files. In `next dev` we skip both so
// rewrites() below work cleanly (trailingSlash mode mangles the proxied
// URL, causing Django to 301-redirect back).
const isProdBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProdBuild ? { output: "export" as const, trailingSlash: true } : {}),
  // Don't normalize the trailing slash — pass URLs to rewrites() verbatim so
  // /store/category/ proxies to Django as /store/category/ (with the slash
  // Django's APPEND_SLASH requires). Without this, Next 308-redirects the
  // slash off, Django redirects it back on, and the browser loops.
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Dev-only proxy so the Next dev server forwards API/admin/media requests
  // to Django on :8000. Lets the frontend use same-origin relative URLs in
  // both dev and prod. Ignored when `output: "export"` runs (next build).
  async rewrites() {
    return [
      { source: "/store/:path*", destination: "http://localhost:8000/store/:path*" },
      { source: "/admin/:path*", destination: "http://localhost:8000/admin/:path*" },
      { source: "/media/:path*", destination: "http://localhost:8000/media/:path*" },
    ];
  },
};

export default nextConfig;
