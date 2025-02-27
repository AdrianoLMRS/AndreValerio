import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      // ...reactHooks.configs.recommended.rules,
      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true }
      // ],
      "indent": ["warn", 4],
      "quotes": ["warn", "single"],
      "semi": ["warn", "always"],
      "no-unused-vars": "warn",
      "no-console": "warn",
      "import/no-extraneous-dependencies": "off"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
