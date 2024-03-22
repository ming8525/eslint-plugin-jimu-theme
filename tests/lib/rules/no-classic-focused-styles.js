const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-focused-styles')


ruleTester.run('no-classic-focused-styles', rule, {
  valid: [
    {
      code: 'const style = `outline: 2px solid ${theme.sys.color.action.focus};`'
    },
    {
      code: 'const component = () => { return <div style={{ outline: `2px solid ${theme.sys.color.action.focus}` }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const style = `outline: ${theme.focusedStyles.width} solid ${theme.focusedStyles.color};`',
      output: 'const style = `outline: ${\'2px\'} solid ${theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-width: ${theme.focusedStyles.width};`',
      output: 'const style = `outline-width: ${\'2px\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-color: ${theme.focusedStyles.color};`',
      output: 'const style = `outline-color: ${theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ outline: `${theme.focusedStyles.width} solid ${theme.focusedStyles.color}` }} /> }',
      output: 'const component = () => { return <div style={{ outline: `${\'2px\'} solid ${theme.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline: ${theme.focusedStyles.width} solid ${theme?.focusedStyles.color};`',
      output: 'const style = `outline: ${\'2px\'} solid ${theme?.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-color: ${theme.focusedStyles?.color};`',
      output: 'const style = `outline-color: ${theme.sys.color.action?.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ outline: `${theme.focusedStyles.width} solid ${theme?.focusedStyles.color}` }} /> }',
      output: 'const component = () => { return <div style={{ outline: `${\'2px\'} solid ${theme?.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const style = `outline: ${props.theme.focusedStyles.width} solid ${props.theme.focusedStyles.color};`',
      output: 'const style = `outline: ${\'2px\'} solid ${props.theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-width: ${props.theme.focusedStyles.width};`',
      output: 'const style = `outline-width: ${\'2px\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-color: ${props.theme.focusedStyles.color};`',
      output: 'const style = `outline-color: ${props.theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ outline: `${props.theme.focusedStyles.width} solid ${props.theme.focusedStyles.color}` }} /> }',
      output: 'const component = () => { return <div style={{ outline: `${\'2px\'} solid ${props.theme.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline: ${props.theme.focusedStyles.width} solid ${props.theme?.focusedStyles.color};`',
      output: 'const style = `outline: ${\'2px\'} solid ${props.theme?.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-color: ${props.theme.focusedStyles?.color};`',
      output: 'const style = `outline-color: ${props.theme.sys.color.action?.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ outline: `${props.theme.focusedStyles.width} solid ${props.theme?.focusedStyles.color}` }} /> }',
      output: 'const component = () => { return <div style={{ outline: `${\'2px\'} solid ${props.theme?.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    }, 

    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline: ${focusedStyles.width} solid ${focusedStyles.color};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline: ${\'2px\'} solid ${theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline-width: ${focusedStyles.width};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline-width: ${\'2px\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${focusedStyles.color};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${theme.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const focusedStyles = theme.focusedStyles; return <div style={{ outline: `${focusedStyles.width} solid ${focusedStyles.color}` }} /> }',
      output: 'const component = () => { const focusedStyles = theme.focusedStyles; return <div style={{ outline: `${\'2px\'} solid ${theme.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline: ${focusedStyles.width} solid ${theme?.focusedStyles.color};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline: ${\'2px\'} solid ${theme?.sys.color.action.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${theme.sys.color.action?.focus};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const focusedStyles = theme.focusedStyles; return <div style={{ outline: `${focusedStyles.width} solid ${theme?.focusedStyles.color}` }} /> }',
      output: 'const component = () => { const focusedStyles = theme.focusedStyles; return <div style={{ outline: `${\'2px\'} solid ${theme?.sys.color.action.focus}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }, { messageId: 'message', type: 'MemberExpression' }]
    },
  ]
})
