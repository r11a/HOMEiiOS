import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: { target: "es2022", outDir: "dist-studio", emptyOutDir: true, cssCodeSplit: false,
    lib: { entry: "src/studio-panel.tsx", formats: ["es"], fileName: () => "homeii-studio.js" },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
