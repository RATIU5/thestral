import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import simpleStackForm from "simple-stack-form";
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), simpleStackForm(), auth()],
  adapter: vercel()
});