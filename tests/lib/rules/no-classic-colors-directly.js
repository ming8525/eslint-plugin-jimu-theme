/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-colors-directly");
const RuleTester = require('@typescript-eslint/rule-tester');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['../../tsconfig.json']
  }
});

ruleTester.run("no-classic-colors-directly", rule, {
  valid: [
    {
      code: "const style = `border-color: ${theme.colors.primary};`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: ${colors.primary};`",
      output: "const style = `border-color: ${theme.colors.primary};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme directly.", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.white};`",
      output: "const style = `border-color: ${theme?.colors?.white};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme directly.", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.light};`",
      output: "const style = `border-color: ${theme?.colors?.light};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme directly.", type: "MemberExpression" }]
    },
  ],
});
