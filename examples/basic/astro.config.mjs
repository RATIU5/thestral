import { defineConfig } from 'astro/config';
import { thestralIntegration } from '@thestral/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [thestralIntegration({
    widgets: "./src/widgets",
    templates: "./src/templates",
    databaseURI: "mongodb://admin:password@localhost:27017/thestral"
  })],
});
