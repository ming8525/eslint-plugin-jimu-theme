/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-theme-palette"),
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

ruleTester.run("no-classic-theme-palette", rule, {
  valid: [
    {
      code: "const style = `border-color: ${theme.sys.color.primary.main};`"
    }
  ],
  invalid: [
    {
      code: "const style = `border-color: ${theme.colors.palette.primary[100]};`",
      output: "const style = `border-color: ${theme.sys.color.primary.light};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors.palette.primary[500]};`",
      output: "const style = `border-color: ${theme.sys.color.primary.main};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors.palette.light[500]};`",
      output: "const style = `border-color: ${theme.ref.palette.neutral[500]};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors.palette.dark[500]};`",
      output: "const style = `border-color: ${theme.ref.palette.neutral[1000]};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme?.colors.palette.primary[100]};`",
      output: "const style = `border-color: ${theme?.sys.color.primary.light};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors?.palette.primary[500]};`",
      output: "const style = `border-color: ${theme.sys.color?.primary.main};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors.palette?.light[500]};`",
      output: "const style = `border-color: ${theme.ref.palette?.neutral[500]};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${theme.colors?.palette.dark[500]};`",
      output: "const style = `border-color: ${theme.ref.palette?.neutral[1000]};`",
      errors: [{ message: "Unexpected usage of theme palette of classic theme", type: "MemberExpression" }]
    }
  ],
});
