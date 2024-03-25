const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-border')

const validTests = [
  {
    code: 'const style = `border: 1px solid ${theme.sys.color.divider.primary};`'
  },
  {
    code: 'const component = () => { return <div style={{ margin: `1px solid ${theme.sys.color.divider.primary}` }} /> }'
  },
]

const invalidTests = [
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
    output: 'const style = `border-color: ${theme.sys.color.divider?.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ border: `${theme.border.width} ${theme.border.type} ${theme?.border.color}` }} /> }',
    output: 'const component = () => { return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme?.sys.color.divider.primary}` }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },

  {
    code: 'const style = `border: ${props.theme.border.width} ${props.theme.border.type} ${props.theme.border.color};`',
    output: 'const style = `border: ${\'1px\'} ${\'solid\'} ${props.theme.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-width: ${props.theme.border.width};`',
    output: 'const style = `border-width: ${\'1px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-color: ${props.theme.border.color};`',
    output: 'const style = `border-color: ${props.theme.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderStyle: props.theme.border.type }} /> }',
    output: 'const component = () => { return <div style={{ borderStyle: \'solid\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ border: `${props.theme.border.width} ${props.theme.border.type} ${props.theme.border.color}` }} /> }',
    output: 'const component = () => { return <div style={{ border: `${\'1px\'} ${\'solid\'} ${props.theme.sys.color.divider.primary}` }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border: ${props.theme.border.width} ${props.theme.border.type} ${theme?.border.color};`',
    output: 'const style = `border: ${\'1px\'} ${\'solid\'} ${theme?.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-color: ${props.theme.border?.color};`',
    output: 'const style = `border-color: ${props.theme.sys.color.divider?.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ border: `${props.theme.border.width} ${props.theme.border.type} ${theme?.border.color}` }} /> }',
    output: 'const component = () => { return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme?.sys.color.divider.primary}` }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  
  {
    code: 'const border = theme.border; const style = `border: ${border.width} ${border.type} ${border.color};`',
    output: 'const border = theme.border; const style = `border: ${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const border = theme.border; const style = `border-width: ${border.width};`',
    output: 'const border = theme.border; const style = `border-width: ${\'1px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const border = theme.border; const style = `border-color: ${border.color};`',
    output: 'const border = theme.border; const style = `border-color: ${theme.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const border = theme.border; return <div style={{ borderStyle: theme.border.type }} /> }',
    output: 'const component = () => { const border = theme.border; return <div style={{ borderStyle: \'solid\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const border = theme.border; return <div style={{ border: `${border.width} ${border.type} ${border.color}` }} /> }',
    output: 'const component = () => { const border = theme.border; return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary}` }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const border = theme.border; const style = `border: ${border.width} ${border.type} ${border.color};`',
    output: 'const border = theme.border; const style = `border: ${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const border = theme.border; const style = `border-color: ${border?.color};`',
    output: 'const border = theme.border; const style = `border-color: ${theme.sys.color.divider?.primary};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const border = theme.border; return <div style={{ border: `${border.width} ${border.type} ${border.color}` }} /> }',
    output: 'const component = () => { const border = theme.border; return <div style={{ border: `${\'1px\'} ${\'solid\'} ${theme.sys.color.divider.primary}` }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
  },
]

ruleTester.run('no-classic-border', rule, {
  valid: validTests,
  invalid: invalidTests
})

module.exports = { validTests, invalidTests }