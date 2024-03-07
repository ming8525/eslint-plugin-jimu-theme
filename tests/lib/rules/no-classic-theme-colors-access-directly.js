/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-theme-colors-access-directly"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['../../tsconfig.json']
  }
});

ruleTester.run("no-classic-theme-colors-access-directly", rule, {
  valid: [
    {
      code: "const primary = theme.colors.primary"
    }
  ],

  invalid: [
    {
      code: "const colors = theme.colors",
      errors: [{ message: "Do not directly access `theme.colors` in variable assignment.", type: "VariableDeclarator" }]
    },
  ],
});
