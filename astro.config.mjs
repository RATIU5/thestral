import { defineConfig } from "astro/config";
import dynamicImport from './lib/dynamic-import';

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [dynamicImport()],
  vite: {
    define: {
      __VERBOSE__: process.argv.includes("--verbose"),
    },
    optimizeDeps: {
      exclude: ["astro-dynamic-import:internal"],
    },
  },
});
