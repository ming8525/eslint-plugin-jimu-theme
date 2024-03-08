import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from "../../lib/rules/no-classic-colors-directly"
import { AST_NODE_TYPES } from '@typescript-eslint/types';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
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
      code: "const style = `border-color: ${theme.colors.primary};`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: ${colors.primary};`",
      output: "const style = `border-color: ${theme.colors.primary};`",
      errors: [{ messageId: "message", type: AST_NODE_TYPES.MemberExpression }]
    },
    {
      code: "const style = `border-color: ${colors?.white};`",
      output: "const style = `border-color: ${theme?.colors?.white};`",
      errors: [{ messageId: "message", type: AST_NODE_TYPES.MemberExpression }]
    },
    {
      code: "const style = `border-color: ${colors?.light};`",
      output: "const style = `border-color: ${theme?.colors?.light};`",
      errors: [{ messageId: "message", type: AST_NODE_TYPES.MemberExpression }]
    },
  ],
});
