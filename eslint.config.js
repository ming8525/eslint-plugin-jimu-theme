import globals from "globals"
import js from "@eslint/js"
import eslintPlugin from 'eslint-plugin-eslint-plugin'

export default [
  js.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "node/no-missing-require": ["error", {
        allowModules: ["@typescript-eslint/rule-tester", "mocha"],
      }],

      "node/no-unpublished-require": ["error", {
        allowModules: ["@typescript-eslint/rule-tester", "mocha"],
      }],

      indent: ["warn", 2],
      quotes: ["warn", "single"],
      semi: ["warn", "never"],
    },
  }, {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  }]