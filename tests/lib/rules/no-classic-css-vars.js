// /**
//  * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
//  * @author ming8525
//  */
// "use strict";

// //------------------------------------------------------------------------------
// // Requirements
// //------------------------------------------------------------------------------

// const rule = require("../../../lib/rules/no-classic-css-vars"),
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

// ruleTester.run("no-classic-css-vars", rule, {
//   valid: [
//     {
//       code: "const style = `border-color: var(--primary-500);`"
//     }
//   ],

//   invalid: [
//     {
//       code: "const style = `border-color: var(--primary);`",
//       output: "const style = `border-color: var(--sys-color-primary);`",
//       errors: [{ message: "Unexpected usage of css vars of classic theme", type: "TemplateElement" }]
//     },
//   ],
// });
