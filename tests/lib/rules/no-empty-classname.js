const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-empty-classname')

ruleTester.run('no-empty-classname', rule, {
  valid: [
    {
      code: 'const component = () => { return <div className="foo" /> }'
    }
  ],

  invalid: [
    {
      code: 'const component = () => { return <div className="" /> }',
      output: 'const component = () => { return <div /> }',
      errors: [{ messageId: 'message', type: 'JSXAttribute' }]
    },
    {
      code: 'const component = () => { return <div className="" tabIndex={0} /> }',
      output: 'const component = () => { return <div tabIndex={0} /> }',
      errors: [{ messageId: 'message', type: 'JSXAttribute' }]
    }
  ],
})
