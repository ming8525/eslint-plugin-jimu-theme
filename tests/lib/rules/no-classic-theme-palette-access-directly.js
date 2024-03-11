const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-theme-palette-access-directly')

ruleTester.run('no-classic-theme-palette-access-directly', rule, {
  valid: [
    {
      code: 'const primary = theme.colors.palette.primary'
    }
  ],

  invalid: [
    {
      code: 'const palette = theme.colors.palette',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
  ],
})
