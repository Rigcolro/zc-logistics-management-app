import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vue from "@vitejs/plugin-vue";
import styleImport, { VantResolve } from "vite-plugin-style-import";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.0.70:8080",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    // resolve: {
    //   alias: {
    //     api: path.resolve(__dirname, "api"),
    //   },
    // },
  },
  plugins: [
    uni(),
    // vue(),
    // styleImport({
    //   resolves: [VantResolve()],
    // }),
  ],
});
