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
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/lab",
        "@mui/material",
        "@mui/x-date-pickers",
        "@app-artisans/image-uploader",
        "@tinymce/tinymce-react",
        "react",
        "react-dom",
        "luxon",
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
