const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-border-radius')

const validTests = [
  {
    code: 'const style = `border-radius: 2px;`'
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: `1px solid ${theme.sys.color.divider.primary}` }} /> }'
  },
  {
    code: 'const style = `border-radius: ${theme.sys.shape.shape1};`'
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.sys.shape.shape1 }} /> }'
  },
]

const invalidTests = [
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses.default};`',
    output: 'const style = `border-radius: ${theme.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses.lg};`',
    output: 'const style = `border-radius: ${theme.sys.shape.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses.none};`',
    output: 'const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses.sm};`',
    output: 'const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses.default }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: theme.sys.shape.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses.lg }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: theme.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses.none }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses.sm }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme?.borderRadiuses.default};`',
    output: 'const style = `border-radius: ${theme?.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses?.lg};`',
    output: 'const style = `border-radius: ${theme.sys.shape?.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme?.borderRadiuses.none};`',
    output: 'const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme.borderRadiuses?.sm};`',
    output: 'const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses?.default }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: theme.sys.shape?.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme?.borderRadiuses.lg }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: theme?.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme?.borderRadiuses.none }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses?.sm }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },

  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses.default};`',
    output: 'const style = `border-radius: ${props.theme.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses.lg};`',
    output: 'const style = `border-radius: ${props.theme.sys.shape.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses.none};`',
    output: 'const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses.sm};`',
    output: 'const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses.default }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: props.theme.sys.shape.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses.lg }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: props.theme.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses.none }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses.sm }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme?.borderRadiuses.default};`',
    output: 'const style = `border-radius: ${theme?.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses?.lg};`',
    output: 'const style = `border-radius: ${props.theme.sys.shape?.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${theme?.borderRadiuses.none};`',
    output: 'const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const style = `border-radius: ${props.theme.borderRadiuses?.sm};`',
    output: 'const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses?.default }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: props.theme.sys.shape?.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme?.borderRadiuses.lg }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: theme?.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: theme?.borderRadiuses.none }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses?.sm }} /> }',
    output: 'const component = () => { return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },

  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses.default};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses.lg};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme.sys.shape.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses.none};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses.sm};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses.default }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme.sys.shape.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses.lg }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses.none }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses.sm }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses.default};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme?.sys.shape.shape1};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses?.lg};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme.sys.shape?.shape2};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses.none};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${\'none\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses?.sm};`',
    output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${\'0px\'};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses?.default }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme.sys.shape?.shape1 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme?.borderRadiuses.lg }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme?.sys.shape.shape2 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: theme?.borderRadiuses.none }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: \'none\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: borderRadiuses?.sm }} /> }',
    output: 'const component = () => { const borderRadiuses = theme.borderRadiuses; return <div style={{ borderRadius: \'0px\' }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
]

ruleTester.run('no-classic-border-radius', rule, {
  valid: validTests,
  invalid: invalidTests
})

module.exports = { validTests, invalidTests }
