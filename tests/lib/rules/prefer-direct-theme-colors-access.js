const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/prefer-direct-theme-colors-access')

ruleTester.run('prefer-direct-theme-colors-access', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.colors.primary};`'
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[300]};`'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: ${colors.primary};`',
      output: 'const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.white};`',
      output: 'const style = `border-color: ${theme?.colors?.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.light};`',
      output: 'const style = `border-color: ${theme?.colors?.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.transparent};`',
      output: 'const style = `border-color: ${theme?.colors?.transparent};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.palette.danger[500]};`',
      output: 'const style = `border-color: ${theme?.colors?.palette.danger[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors.palette?.light[300]};`',
      output: 'const style = `border-color: ${theme?.colors.palette?.light[300]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${palette?.light[200]};`',
      output: 'const style = `border-color: ${theme?.colors?.palette?.light[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ],
})
