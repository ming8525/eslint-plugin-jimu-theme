const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-theme-colors-palette-assignment')

ruleTester.run('no-classic-theme-colors-palette-assignment', rule, {
  valid: [
    {
      code: 'const primary = theme.colors.palette.primary'
    }
  ],

  invalid: [
    {
      code: 'const colors = theme.colors',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.colors.palette',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
  ],
})
