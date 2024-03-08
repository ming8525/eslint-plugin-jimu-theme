const { ruleTester } = require('../utils');
const rule = require("../../../lib/rules/no-classic-theme-colors-access-directly");

ruleTester.run("no-classic-theme-colors-access-directly", rule, {
  valid: [
    {
      code: "const primary = theme.colors.primary"
    }
  ],

  invalid: [
    {
      code: "const colors = theme.colors",
      errors: [{ messageId: "message", type: "VariableDeclarator" }]
    },
  ],
});
