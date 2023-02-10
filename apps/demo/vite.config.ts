import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@neoco/backoffice": path.resolve(__dirname, "../neoco-backoffice/"),
    },
  },
  plugins: [react()],
});
