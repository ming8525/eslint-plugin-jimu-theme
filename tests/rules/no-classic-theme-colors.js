// /**
//  * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
//  * @author ming8525
//  */
// "use strict";

// //------------------------------------------------------------------------------
// // Requirements
// //------------------------------------------------------------------------------

// const rule = require("../../../lib/rules/no-classic-theme-colors"),
//   RuleTester = require("eslint").RuleTester;


// //------------------------------------------------------------------------------
// // Tests
// //------------------------------------------------------------------------------

// const ruleTester = new RuleTester({
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 6,
//     sourceType: 'module',
//     project: ['../../tsconfig.json']
//   }
// });

// ruleTester.run("no-classic-theme-colors", rule, {
//   valid: [
//     {
//       code: "const style = `border-color: ${theme.sys.color.primary.main};`"
//     }
//   ],

//   invalid: [
//     {
//       code: "const style = `border-color: ${theme.colors.primary};`",
//       output: "const style = `border-color: ${theme.sys.color.primary.main};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme.colors.white};`",
//       output: "const style = `border-color: ${theme.ref.palette.white};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme.colors.light};`",
//       output: "const style = `border-color: ${theme.ref.palette.neutral[200]};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme.colors.dark};`",
//       output: "const style = `border-color: ${theme.ref.palette.neutral[1200]};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme?.colors.primary};`",
//       output: "const style = `border-color: ${theme?.sys.color.primary.main};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme.colors?.white};`",
//       output: "const style = `border-color: ${theme.ref.palette?.white};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme?.colors?.light};`",
//       output: "const style = `border-color: ${theme?.ref.palette?.neutral[200]};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     },
//     {
//       code: "const style = `border-color: ${theme?.colors.dark};`",
//       output: "const style = `border-color: ${theme?.ref.palette.neutral[1200]};`",
//       errors: [{ message: "Unexpected usage of theme colors of classic theme", type: "MemberExpression" }]
//     }
//   ]
// });
