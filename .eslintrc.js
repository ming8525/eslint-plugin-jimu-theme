"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    "node/no-missing-require": ["error", {
      "allowModules": ["@typescript-eslint/rule-tester"]
    }],
    "node/no-unpublished-require": ["error", {
      "allowModules": ["@typescript-eslint/rule-tester"]
    }]
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
};
