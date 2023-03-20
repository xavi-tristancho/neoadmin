// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/vct_2/Code/Neoco/neoAdmin/neoadmin/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/vct_2/Code/Neoco/neoAdmin/neoadmin/node_modules/vite-plugin-dts/dist/index.mjs";
import svgr from "file:///C:/Users/vct_2/Code/Neoco/neoAdmin/neoadmin/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\vct_2\\Code\\Neoco\\neoAdmin\\neoadmin\\packages\\forms";
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
        "@emotion/styled",
        "@mui/icons-material",
        "@mui/lab",
        "@mui/material",
        "@mui/x-date-pickers",
        "@neoco/neoco-image-uploader",
        "@tinymce/tinymce-react",
        "react",
        "react-dom",
        "luxon",
        "styled-components"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2Y3RfMlxcXFxDb2RlXFxcXE5lb2NvXFxcXG5lb0FkbWluXFxcXG5lb2FkbWluXFxcXHBhY2thZ2VzXFxcXGZvcm1zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2Y3RfMlxcXFxDb2RlXFxcXE5lb2NvXFxcXG5lb0FkbWluXFxcXG5lb2FkbWluXFxcXHBhY2thZ2VzXFxcXGZvcm1zXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy92Y3RfMi9Db2RlL05lb2NvL25lb0FkbWluL25lb2FkbWluL3BhY2thZ2VzL2Zvcm1zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvYnVpbGQuaHRtbCNsaWJyYXJ5LW1vZGVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxyXG4gICAgICBuYW1lOiBcImZvcm1zXCIsXHJcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgIFwiQGVtb3Rpb24vcmVhY3RcIixcclxuICAgICAgICBcIkBlbW90aW9uL3N0eWxlZFwiLFxyXG4gICAgICAgIFwiQG11aS9pY29ucy1tYXRlcmlhbFwiLFxyXG4gICAgICAgIFwiQG11aS9sYWJcIixcclxuICAgICAgICBcIkBtdWkvbWF0ZXJpYWxcIixcclxuICAgICAgICBcIkBtdWkveC1kYXRlLXBpY2tlcnNcIixcclxuICAgICAgICBcIkBuZW9jby9uZW9jby1pbWFnZS11cGxvYWRlclwiLFxyXG4gICAgICAgIFwiQHRpbnltY2UvdGlueW1jZS1yZWFjdFwiLFxyXG4gICAgICAgIFwicmVhY3RcIixcclxuICAgICAgICBcInJlYWN0LWRvbVwiLFxyXG4gICAgICAgIFwibHV4b25cIixcclxuICAgICAgICBcInN0eWxlZC1jb21wb25lbnRzXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXHJcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXHJcbiAgICAgICAgICBcInN0eWxlZC1jb21wb25lbnRzXCI6IFwic3R5bGVkJDNcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtzdmdyKCksIGR0cygpXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1gsU0FBUyxlQUFlO0FBQzFZLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUN6QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
