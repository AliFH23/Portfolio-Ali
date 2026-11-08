import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Portfolio-Ali/", // must match the GitHub repo name exactly
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    open: true,
  },
});