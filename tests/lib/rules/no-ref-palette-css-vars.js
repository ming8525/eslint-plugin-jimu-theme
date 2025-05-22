const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-ref-palette-css-vars')

ruleTester.run('no-ref-palette-css-vars', rule, {
  valid: [
    {
      code: 'const style = `border-color: var(--sys-color-primary-main);`'
    },
    {
      code: 'const style = `border-color: var(--sys-color-info-light);`'
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--sys-color-info-light)\' }} /> }'
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--sys-color-primary-main)\' }} /> }'
    },
    {
      code: 'const color = \'var(--ref-palette-white)\';',
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-black)\' }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const component = () => { return <WarningOutlined color=\'var(--ref-palette-neutral-200)\' /> };',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <WarningOutlined color=\'var(--ref-palette-primary-100)\' /> };',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },

    {
      code: 'const component = () => { return <WarningOutlined color={\'var(--ref-palette-secondary-200)\'} /> };',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <WarningOutlined color=\'var(--ref-palette-error-300)\' /> };',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <WarningOutlined color=\'var(--ref-palette-success-100)\' /> };',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },

    {
      code: 'const component = () => { return <Tooltip arrowStyle={{ background: \'var(--ref-palette-neutral-300)\', border: { color: \'var(--ref-palette-primary-200)\', width: \'1px\' } }} /> };',
      errors: [{ messageId: 'message', type: 'Literal' }, { messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <Tooltip arrowStyle={{ background: \'var(--ref-palette-primary-300)\', border: { color: \'var(--ref-palette-neutral-1200)\', width: \'1px\' } }} /> };',
      errors: [{ messageId: 'message', type: 'Literal' }, { messageId: 'message', type: 'Literal' }]
    },

    {
      code: 'const color = \'var(--ref-palette-warning-100)\';',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },

    {
      code: 'const color = \'var(--ref-palette-white)\';',
      options: [{ allowBlackAndWhite: false }],
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const color = \'var(--ref-palette-black)\';',
      options: [{ allowBlackAndWhite: false }],
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <WarningOutlined color=\'var(--ref-palette-black)\' /> };',
      options: [{ allowBlackAndWhite: false }],
      errors: [{ messageId: 'message', type: 'Literal' }]
    },

    {
      code: 'const style = `border-color: var(--ref-palette-neutral-100);`',
      errors: [{ messageId: 'message', type: 'TemplateLiteral' }]
    },
    {
      code: 'const style = `border-color: var(--ref-palette-neutral-200);`',
      errors: [{ messageId: 'message', type: 'TemplateLiteral' }]
    },
    {
      code: 'const style = `border-color: var(--ref-palette-neutral-1200);`',
      errors: [{ messageId: 'message', type: 'TemplateLiteral' }]
    },
    {
      code: 'const style = `border-color: var(--ref-palette-error-500);`',
      errors: [{ messageId: 'message', type: 'TemplateLiteral' }]
    },
    
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-primary-700)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-neutral-1200)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-secondary-300)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-error-500)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: \'var(--ref-palette-neutral-400)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: \'1px solid var(--ref-palette-neutral-1000)\' }} /> }',
      errors: [{ messageId: 'message', type: 'Literal' }]
    }
  ],
})
