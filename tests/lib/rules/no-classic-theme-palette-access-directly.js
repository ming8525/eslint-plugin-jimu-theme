/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-theme-palette-access-directly"),
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

ruleTester.run("no-classic-theme-palette-access-directly", rule, {
  valid: [
    {
      code: "const primary = theme.colors.palette.primary"
    }
  ],

  invalid: [
    {
      code: "const colors = theme.colors.palette",
      errors: [{ message: "Do not directly access theme.colors.palette in variable assignment.", type: "VariableDeclarator" }]
    },
  ],
});
