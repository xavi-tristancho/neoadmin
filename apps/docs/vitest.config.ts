/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    exclude: [
      "src/utils/treeParser.test.js",
      "src/utils/tableParser/getHeaders.test.js",
    ],
  },
});
