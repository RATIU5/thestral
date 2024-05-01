import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import dynamicImport from "./lib/dynamic-import";
import react from "@astrojs/react";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [dynamicImport(), tailwind({
    applyBaseStyles: false
  }), react(), db()],
  // This is a workaround for a bug in dynamic-import
  vite: {
    define: {
      __VERBOSE__: process.argv.includes("--verbose")
    },
    optimizeDeps: {
      exclude: ["astro-dynamic-import:internal"]
    }
  }
});