import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const extensionEntry = fileURLToPath(
  new URL("./extension/newtab.html", import.meta.url),
);

export default defineConfig({
  root: "extension",
  base: "./",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: "../extension-dist",
    emptyOutDir: true,
    target: "chrome120",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: extensionEntry,
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");
          const contentFile = normalizedId.match(/\/content\/([^/]+)\.tsx?$/)?.[1];
          if (!contentFile) return;

          // The complete catalog remains packaged and available offline, but
          // each subject keeps an independent cache/parse boundary. Keep the
          // source dossiers, close readings, illustrations, and economics
          // expansion modules out of these eager catalog chunks: those modules
          // have their own deliberate dynamic-import boundaries.
          if (
            contentFile === "philosophy"
            || contentFile.startsWith("philosophyCanon")
            || contentFile.startsWith("philosophyExpansion")
            || contentFile === "philosophyCuration"
            || contentFile === "philosophySupplement"
            || contentFile === "westernThoughtConnections"
          ) {
            return "westernCatalog";
          }
          if (contentFile === "chinese" || contentFile === "chineseExpansion") {
            return "chineseCatalog";
          }
          if (
            contentFile === "mao"
            || contentFile.startsWith("maoCorpus")
            || contentFile === "maoSourceUpgrades"
            || contentFile === "maoSupplement"
          ) {
            return "maoCatalog";
          }
          if (
            contentFile === "science"
            || contentFile === "scienceCorpusTypes"
            || contentFile === "scienceEarly"
            || contentFile === "scienceLife"
            || contentFile === "scienceModern"
          ) {
            return "scienceCatalog";
          }
          if (
            contentFile === "economics"
            || contentFile === "economicsCorpusTypes"
            || contentFile === "economicsFoundations"
            || contentFile === "economicsInvestment"
            || contentFile === "economicsModern"
          ) {
            return "economicsCatalog";
          }
          if (contentFile.startsWith("psychology")) {
            return "psychologyCatalog";
          }
          if (contentFile.startsWith("indian")) {
            return "indianCatalog";
          }
        },
      },
    },
  },
});
