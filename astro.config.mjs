import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import simpleStackForm from "simple-stack-form";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), simpleStackForm()]
});