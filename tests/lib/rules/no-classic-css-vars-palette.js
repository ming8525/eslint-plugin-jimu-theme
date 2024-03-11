const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-css-vars-palette')

ruleTester.run('no-classic-css-vars-palette', rule, {
  valid: [
    {
      code: 'const style = `border-color: var(--sys-color-primary-main);`'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: var(--primary-100);`',
      output: 'const style = `border-color: var(--sys-color-primary-light);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--danger-500);`',
      output: 'const style = `border-color: var(--sys-color-error-main);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--light-300);`',
      output: 'const style = `border-color: var(--ref-palette-neutral-400);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--dark-500);`',
      output: 'const style = `border-color: var(--ref-palette-neutral-1000);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
  ],
})
