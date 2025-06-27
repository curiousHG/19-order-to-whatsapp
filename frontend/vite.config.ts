import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow ngrok
  server: {
    allowedHosts: ['cdbe-2406-7400-56-7a22-6408-e1f2-56d7-ce86.ngrok-free.app'],
  }
});