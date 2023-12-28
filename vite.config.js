import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      proxy: {
        "/api": "https://api.smartchoureynait.com",
      },
    },
    build: {
      outDir: "build",
    },
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
