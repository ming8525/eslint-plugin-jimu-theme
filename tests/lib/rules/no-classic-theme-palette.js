const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-theme-palette')

ruleTester.run('no-classic-theme-palette', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.sys.color.primary.main};`'
    }
  ],
  invalid: [
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[500]};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.light[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.dark[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[1000]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme?.sys.color.primary.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.palette.primary[500]};`',
      output: 'const style = `border-color: ${theme.sys.color?.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette?.light[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette?.neutral[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.palette.dark[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette?.neutral[1000]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ],
})
