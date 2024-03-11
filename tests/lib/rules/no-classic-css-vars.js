const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-css-vars')

ruleTester.run('no-classic-css-vars', rule, {
  valid: [
    {
      code: 'const style = `border-color: var(--ref-palette-neutral-200);`'
    },
    {
      code: 'const style = `border-color: var(--sys-color-primary-main);`'
    },
    {
      code: 'const style = `border-color: var(--mixin-shared-theme-body-color);`'
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
    }
    
  ],
})
