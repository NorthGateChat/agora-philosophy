import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const extensionEntry = fileURLToPath(
  new URL("./extension/newtab.html", import.meta.url),
);

export default defineConfig({
  root: "extension",
  base: "./",
  plugins: [react()],
  build: {
    outDir: "../extension-dist",
    emptyOutDir: true,
    target: "chrome120",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: extensionEntry,
    },
  },
});
