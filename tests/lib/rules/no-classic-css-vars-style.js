const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-css-vars-style')

ruleTester.run('no-classic-css-vars-style', rule, {
  valid: [
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-neutral-200)\' }} /> }'
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--sys-color-primary-main)\' }} /> }'
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--mixin-shared-theme-body-color)\' }} /> }'
    }
  ],

  invalid: [
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--primary)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--sys-color-primary-main)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--white)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-white)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--light)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-neutral-200)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--dark)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-neutral-1200)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--transparent)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'transparent\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--transparent)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid transparent\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--primary-100)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--sys-color-primary-light)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--danger-500)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--sys-color-error-main)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--light-300)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-neutral-400)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--dark-500)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-neutral-1000)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--org-header-bg)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--mixin-shared-theme-header-bg)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--org-header-color)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--mixin-shared-theme-header-color)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--org-body-bg)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--mixin-shared-theme-body-bg)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--org-body-color)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--mixin-shared-theme-body-color)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--org-body-link)\' }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'var(--mixin-shared-theme-body-link)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--org-button-bg)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--mixin-shared-theme-button-bg)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--org-button-color)\' }} /> }',
      output: 'const component = () => { return <div style={{ border: \'1px solid var(--mixin-shared-theme-button-color)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    }
  ],
})
