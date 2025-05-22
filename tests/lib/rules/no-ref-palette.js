const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-ref-palette')

const validTests = [
  {
    code: 'const style = `border-color: ${theme.sys.color.primary.main};`'
  },
  {
    code: 'const style = `border-color: ${theme.mixin.sharedTheme?.button.bg};`'
  },
  {
    code: 'const component = () => { return <div style={{ border: `1px solid ${theme.sys.color.primary.main}` }} /> }'
  },
  {
    code: 'const component = () => { return <div style={{ border: theme.mixin.sharedTheme?.button.bg }} /> }'
  },
  {
    code: 'const white = theme.ref.palette && theme.ref.palette.white; const style = `color: ${white};`',
  },
  {
    code: 'const component = () => { const black = theme.ref.palette && theme.ref.palette.black; return <div style={{ color: black }} /> }',
  },
]

const invalidTests = [
  {
    code: 'const style = `border-color: ${theme.ref.palette.primary[100]};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.secondary[100] }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const neutral200 = theme && theme.ref.palette.neutral[200]; const style = `color: ${neutral200};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const neutral1200 = theme.ref.palette.neutral[1200]; const style = `color: ${neutral1200};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const error100 = theme.ref.palette && theme.ref.palette.error[100]; return <div style={{ color: error100 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const primary100 = theme.ref.palette && theme.ref.palette.primary[100]; const style = `color: ${primary100};`',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const primary100 = theme.ref.palette && theme.ref.palette.primary[100]; return <div style={{ color: primary100 }} /> }',
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const white = theme.ref.palette.white; const style = `color: ${white};`',
    options: [{ allowBlackAndWhite: false }],
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
  {
    code: 'const component = () => { const black = theme.ref.palette.black; return <div style={{ color: black }} /> }',
    options: [{ allowBlackAndWhite: false }],
    errors: [{ messageId: 'message', type: 'MemberExpression' }]
  },
]

ruleTester.run('no-ref-palette', rule, {
  valid: validTests,
  invalid: invalidTests
})

