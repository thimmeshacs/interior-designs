// vite.config.js
import { defineConfig } from "vite"; // Import defineConfig correctly
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Add React plugin
  css: {
    postcss: "./postcss.config.cjs", // Ensure this file exists and is correctly named
  },
  optimizeDeps: {
    include: ["simplex-noise"], // Pre-bundle simplex-noise for better performance
  },
});
