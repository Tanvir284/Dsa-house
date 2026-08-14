import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // One-off CommonJS data-authoring scripts. These ran once to generate the
    // curriculum JSON and are kept for provenance, not shipped or imported by
    // the app. Linting them under the app's TypeScript/ESM rules produced 50
    // `no-require-imports` errors that could never be actioned, which meant
    // `npm run lint` was permanently red and therefore ignored — the failure
    // mode a lint gate exists to prevent.
    "scripts/**/*.js",
  ]),
]);

export default eslintConfig;
