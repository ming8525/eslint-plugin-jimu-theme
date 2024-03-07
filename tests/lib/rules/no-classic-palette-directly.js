/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-palette-directly"),
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

ruleTester.run("no-classic-palette-directly", rule, {
  valid: [
    {
      code: "const style = `border-color: ${theme.colors.palette.primary[100]};`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: ${palette.primary[100]};`",
      output: "const style = `border-color: ${theme.colors.palette.primary[100]};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors.palette`) of classic theme directly.", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${palette?.light[200]};`",
      output: "const style = `border-color: ${theme?.colors?.palette?.light[200]};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors.palette`) of classic theme directly.", type: "MemberExpression" }]
    }
  ],
});
