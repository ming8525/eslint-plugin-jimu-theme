const { ruleTester } = require('../utils');
const rule = require("../../../lib/rules/no-classic-css-vars");

ruleTester.run("no-classic-css-vars", rule, {
  valid: [
    {
      code: "const style = `border-color: var(--primary-500);`"
    }
  ],

  invalid: [
    {
      code: "const style = `border-color: var(--primary);`",
      output: "const style = `border-color: var(--sys-color-primary);`",
      errors: [{ messageId: "message", type: "TemplateElement" }]
    },
  ],
});
