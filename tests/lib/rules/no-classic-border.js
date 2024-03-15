const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-border')


ruleTester.run('no-classic-border', rule, {
  valid: [
    {
      code: 'const style = `border: 1px solid ${theme.sys.color.divider.primary};`'
    },
    {
      code: 'const component = () => { return <div style={{ margin: `1px solid ${theme.sys.color.divider.primary}` }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const style = `border: ${theme.border.width} ${theme.border.type} ${theme.border.color};`',
      output: 'const style = `border: ${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-width: ${theme.border.width};`',
      output: 'const style = `border-width: ${\'1px\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.border.color};`',
      output: 'const style = `border-color: ${theme.sys.color.divider.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderStyle: theme.border.type }} /> }',
      output: 'const component = () => { return <div style={{ borderStyle: \'solid\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `${theme.border.width} ${theme.border.type} ${theme.border.color}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border: ${theme.border.width} ${theme.border.type} ${theme?.border.color};`',
      output: 'const style = `border: ${\'1px\'} ${\'solid\'} ${theme?.sys.color.divider.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.border?.color};`',
      output: 'const style = `border-color: ${theme?.sys.color.divider.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `${theme.border.width} ${theme.border.type} ${theme?.border.color}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme?.sys.color.divider.primary}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
