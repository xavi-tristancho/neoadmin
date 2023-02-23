import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/guide/build.html#library-mode

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "neoAdmin",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/x-data-grid",
        "@neoco/neoco-form",
        "@neoco/neoco-image-uploader",
        "notistack",
        "react",
        "react-dom",
        "react-router-dom",
        "styled-components",
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
