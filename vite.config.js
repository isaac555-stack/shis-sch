// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all IPs so phones on LAN can access
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Backend server (ensure Backend/.env has PORT=5000)
        changeOrigin: true,
      },
    },
  },
});
