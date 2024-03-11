const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-css-vars-colors')

ruleTester.run('no-classic-css-vars-colors', rule, {
  valid: [
    {
      code: 'const style = `border-color: var(--sys-color-primary-main);`'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: var(--primary);`',
      output: 'const style = `border-color: var(--sys-color-primary-main);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--white);`',
      output: 'const style = `border-color: var(--ref-palette-white);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--light);`',
      output: 'const style = `border-color: var(--ref-palette-neutral-200);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--dark);`',
      output: 'const style = `border-color: var(--ref-palette-neutral-1200);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--transparent);`',
      output: 'const style = `border-color: transparent;`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
  ],
})
