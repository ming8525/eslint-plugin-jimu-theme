const { ruleTester } = require('../utils');
const rule = require("../../../lib/rules/no-classic-colors-directly");

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
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.white};`",
      output: "const style = `border-color: ${theme?.colors?.white};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.light};`",
      output: "const style = `border-color: ${theme?.colors?.light};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
    {
      code: "const style = `border-color: ${colors?.transparent};`",
      output: "const style = `border-color: ${theme?.colors?.transparent};`",
      errors: [{ messageId: "message", type: "MemberExpression" }]
    },
  ],
});
