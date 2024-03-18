const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-dark-theme')


ruleTester.run('no-classic-dark-theme', rule, {
  valid: [
    {
      code: 'const component = () => { return <div style={{ background: theme.sys.color.mode === \'dark\' ? \'black\' : \'white\' }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const component = () => { return <div style={{ background: theme.darkTheme ? \'black\' : \'white\' }} /> }',
      output: 'const component = () => { return <div style={{ background: theme.sys.color.mode === \'dark\' ? \'black\' : \'white\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ background: theme?.darkTheme ? \'black\' : \'white\' }} /> }',
      output: 'const component = () => { return <div style={{ background: theme?.sys.color.mode === \'dark\' ? \'black\' : \'white\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
  ]
})
