const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-theme-colors')


ruleTester.run('no-classic-theme-colors', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.sys.color.primary.main};`'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: ${theme.colors.primary};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.white};`',
      output: 'const style = `border-color: ${theme.ref.palette.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.light};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.dark};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[1200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.primary};`',
      output: 'const style = `border-color: ${theme?.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.white};`',
      output: 'const style = `border-color: ${theme.ref.palette?.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors?.light};`',
      output: 'const style = `border-color: ${theme?.ref.palette?.neutral[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.dark};`',
      output: 'const style = `border-color: ${theme?.ref.palette.neutral[1200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.transparent};`',
      output: 'const style = `border-color: ${\'transparent\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
