const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-theme-colors-access-directly')

ruleTester.run('no-classic-theme-colors-access-directly', rule, {
  valid: [
    {
      code: 'const primary = theme.colors.palette.primary'
    }
  ],

  invalid: [
    {
      code: 'const palette = theme.colors',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
  ],
})
