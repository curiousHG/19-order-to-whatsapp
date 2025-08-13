import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow ngrok
  server: {
    allowedHosts: ['85a009ec8117.ngrok-free.app'],
    proxy: {
      '/store': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});