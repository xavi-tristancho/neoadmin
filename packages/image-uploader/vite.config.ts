import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/guide/build.html#library-mode

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "forms",
      fileName: "index",
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
        "react-dom",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled$3",
        },
      },
    },
  },
  plugins: [svgr(), dts()],
});
