const { ruleTester } = require('../utils');
const rule = require("../../../lib/rules/no-classic-palette-directly");

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
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${palette?.light[200]};`",
      output: "const style = `border-color: ${theme?.colors?.palette?.light[200]};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    }
  ],
});
