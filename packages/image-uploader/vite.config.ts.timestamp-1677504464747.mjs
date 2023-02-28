// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///home/miki/Neoco/neoadmin/node_modules/vite/dist/node/index.js";
import dts from "file:///home/miki/Neoco/neoadmin/node_modules/vite-plugin-dts/dist/index.mjs";
import svgr from "file:///home/miki/Neoco/neoadmin/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "/home/miki/Neoco/neoadmin/packages/image-uploader";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "forms",
      fileName: "index"
    },
    rollupOptions: {
      external: [
        "@emotion/react",
        "@mui/material",
        "i18next",
        "luxon",
        "react-i18next",
        "styled-components",
        "react",
        "react-dom"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled$3"
        }
      }
    }
  },
  plugins: [svgr(), dts()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taWtpL05lb2NvL25lb2FkbWluL3BhY2thZ2VzL2ltYWdlLXVwbG9hZGVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taWtpL05lb2NvL25lb2FkbWluL3BhY2thZ2VzL2ltYWdlLXVwbG9hZGVyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pa2kvTmVvY28vbmVvYWRtaW4vcGFja2FnZXMvaW1hZ2UtdXBsb2FkZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvYnVpbGQuaHRtbCNsaWJyYXJ5LW1vZGVcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcImZvcm1zXCIsXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJAZW1vdGlvbi9yZWFjdFwiLFxuICAgICAgICBcIkBtdWkvbWF0ZXJpYWxcIixcbiAgICAgICAgXCJpMThuZXh0XCIsXG4gICAgICAgIFwibHV4b25cIixcbiAgICAgICAgXCJyZWFjdC1pMThuZXh0XCIsXG4gICAgICAgIFwic3R5bGVkLWNvbXBvbmVudHNcIixcbiAgICAgICAgXCJyZWFjdFwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgICAgXCJzdHlsZWQtY29tcG9uZW50c1wiOiBcInN0eWxlZCQzXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtzdmdyKCksIGR0cygpXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLGVBQWU7QUFDN1YsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixxQkFBcUI7QUFBQSxRQUN2QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDekIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
