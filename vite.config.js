import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";
  return {
    define: {
      "process.env.REACT_APP_GECKO_API": JSON.stringify(
        env.REACT_APP_GECKO_API
      ),
      "process.env.VITE_NEWS_API_KEY": JSON.stringify(env.REACT_APP_NEWS_API),
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development"
      ),
    },
    plugins: [react()],
    build: {
      minify: "esbuild",
      sourcemap: false,
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      host: true,
      port: process.env.PORT || 10000,
      strictPort: true,
      allowedHosts: ["coingecko-and-news.onrender.com"],
      proxy: {
        "/api/news": {
          target: "https://newsapi.org/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/news/, "/everything"),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader(
                "Authorization",
                `Bearer ${env.REACT_APP_NEWS_API}`
              );
            });
          },
        },
      },
    },
    preview: {
      port: process.env.PORT || 10000,
      host: true,
      allowedHosts: ["coingecko-and-news.onrender.com"],
    },
  };
});
