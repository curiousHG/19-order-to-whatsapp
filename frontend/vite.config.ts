import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow ngrok
  server: {
    allowedHosts: ['05da-2406-7400-56-7a22-b913-3e47-8c67-3d65.ngrok-free.app'],
    proxy: {
      '/store': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
});