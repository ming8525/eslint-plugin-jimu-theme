const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-shared-theme-css-vars')

ruleTester.run('no-classic-shared-theme-css-vars', rule, {
  valid: [
    {
      code: 'const style = `border-color: var(--mixin-shared-theme-body-color);`'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: var(--org-header-bg);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-header-bg);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-header-color);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-header-color);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-body-bg);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-body-bg);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-body-color);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-body-color);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-body-link);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-body-link);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-button-bg);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-button-bg);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
    {
      code: 'const style = `border-color: var(--org-button-color);`',
      output: 'const style = `border-color: var(--mixin-shared-theme-button-color);`',
      errors: [{ messageId: 'message', type: 'TemplateElement' }]
    },
  ],
})
