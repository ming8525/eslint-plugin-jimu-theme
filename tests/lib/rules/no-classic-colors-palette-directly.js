const { ruleTester } = require('../utils');
const rule = require("../../../lib/rules/no-classic-colors-palette-directly");

ruleTester.run("no-classic-colors-palette-directly", rule, {
  valid: [
    {
      code: "const style = `border-color: ${theme.colors.primary};`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: ${colors.palette.primary[100]};`",
      output: "const style = `border-color: ${theme.colors.palette.primary[100]};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.palette.danger[500]};`",
      output: "const style = `border-color: ${theme?.colors?.palette.danger[500]};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors.palette?.light[300]};`",
      output: "const style = `border-color: ${theme?.colors.palette?.light[300]};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
  ],
});
