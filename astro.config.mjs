import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import dynamicImport from "./lib/dynamic-import";

// https://astro.build/config
export default defineConfig({
  integrations: [dynamicImport(), tailwind()],
  // This is a workaround for a bug in dynamic-import
  vite: {
    define: {
      __VERBOSE__: process.argv.includes("--verbose"),
    },
    optimizeDeps: {
      exclude: ["astro-dynamic-import:internal"],
    },
  },
});
