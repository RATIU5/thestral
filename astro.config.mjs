import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import dynamicImport from './lib/dynamic-import';

// https://astro.build/config
export default defineConfig({
  integrations: [dynamicImport(), tailwind(),]
});