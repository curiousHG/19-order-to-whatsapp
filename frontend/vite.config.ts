import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow ngrok
  server: {
    allowedHosts: ['57d2-2406-7400-56-7a22-7819-c84c-d6db-448.ngrok-free.app'],
    proxy: {
      '/store': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});