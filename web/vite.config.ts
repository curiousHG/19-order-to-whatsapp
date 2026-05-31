import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Dev server proxies /store, /admin, /media to Django on :8000 — paths and
// trailing slashes are passed through verbatim (Vite's http-proxy preserves
// the URL exactly, unlike Next's `:path*` rewrites which silently strip the
// trailing slash and fight Django's APPEND_SLASH).
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
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
