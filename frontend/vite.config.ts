import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow ngrok
  server: {
    allowedHosts: ['c2ec-2406-7400-56-7a22-e82d-911c-27a0-5f7d.ngrok-free.app'],
    proxy: {
      '/store': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});