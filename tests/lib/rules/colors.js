/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/colors"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("colors", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "theme.colors.primary",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
