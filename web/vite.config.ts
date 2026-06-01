import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Dev server proxies /store, /admin, /media, /accounts to Django on :8000 —
// paths and trailing slashes are passed through verbatim (Vite's http-proxy
// preserves the URL exactly, unlike Next's `:path*` rewrites which silently
// strip the trailing slash and fight Django's APPEND_SLASH).
// /accounts is django-allauth's OAuth round-trip; we keep it on :3000 (the
// user-facing dev origin) so the session cookie Django sets after Google
// sign-in lands on the same origin the SPA runs on — otherwise /store/me/
// would never see a sessionid.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    proxy: {
      "/store": "http://localhost:8000",
      "/admin": "http://localhost:8000",
      "/media": "http://localhost:8000",
      // /accounts needs the Host header preserved as the browser sent it
      // (localhost:3000) so django-allauth builds the Google OAuth
      // redirect_uri using the SPA's origin. Vite's http-proxy, contrary to
      // the docs, defaults to sending Host: localhost:8000 here; the
      // configure callback below restores the client's Host on each proxied
      // request. Without this you get an Error 400 redirect_uri_mismatch
      // because Django asks Google to call back to :8000.
      "/accounts": {
        target: "http://localhost:8000",
        changeOrigin: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if (req.headers.host) proxyReq.setHeader("host", req.headers.host);
          });
        },
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
