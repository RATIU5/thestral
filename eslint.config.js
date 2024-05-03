import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginA11y from "eslint-plugin-jsx-a11y";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginA11y.configs.recommended,

  {
    files: ["*.astro"],
    processor: "astro/client-side-ts", // <- Uses the "client-side-ts" processor.
    rules: {

    },
  }
];