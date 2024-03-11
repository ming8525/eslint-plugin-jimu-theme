const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-shared-theme-colors')

ruleTester.run('no-classic-shared-theme-colors', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.mixin.sharedTheme?.button.bg};`'
    }
  ],
  invalid: [
    {
      code: 'const style = `border-color: ${theme.colors?.orgSharedColors.button.bg};`',
      output: 'const style = `border-color: ${theme.mixin.sharedTheme?.button.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.orgSharedColors.body.color};`',
      output: 'const style = `border-color: ${theme?.mixin.sharedTheme.body.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.orgSharedColors.header.bg};`',
      output: 'const style = `border-color: ${theme.mixin.sharedTheme?.header.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.orgSharedColors.body.link};`',
      output: 'const style = `border-color: ${theme?.mixin.sharedTheme.body.link};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ],
})
