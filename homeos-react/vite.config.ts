import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Library mode preserves process.env references by default. HOMEiiOS runs
  // directly in a browser/WebView, so React must be resolved to its production
  // branch at build time instead of expecting a Node.js `process` global.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: "src/panel.tsx",
      formats: ["es"],
      fileName: () => "homeiios-panel.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "homeiios-panel.[ext]"
      }
    }
  }
});
