/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-classic-colors-directly"),
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

ruleTester.run("no-classic-colors-directly", rule, {
  valid: [
    {
      code: "const style = `border-color: ${theme.sys.color.primary.main};`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: ${colors.primary};`",
      output: "const style = `border-color: ${theme.sys.color.primary.main};`",
      errors: [{ message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme", type: "MemberExpression" }]
    },
  ],
});
