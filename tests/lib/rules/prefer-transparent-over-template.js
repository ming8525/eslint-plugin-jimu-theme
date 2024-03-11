const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/prefer-transparent-over-template')

ruleTester.run('prefer-transparent-over-template', rule, {
  valid: [
    {
      code: 'const style = `color: transparent;`'
    }
  ],
  invalid: [
    {
      code: 'const style = `color: ${\'transparent\'};`',
      output: 'const style = `color: transparent;`',
      errors: [{ messageId: 'message', type: 'Literal' }]
    }
  ],
})
