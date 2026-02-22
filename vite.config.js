import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.js"),
      name: "BinaryIndexedTree", // global name cho UMD/IIFE.
      fileName: (format) => `binary-indexed-tree.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
