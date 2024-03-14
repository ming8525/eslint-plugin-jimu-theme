const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-sizes')


ruleTester.run('no-classic-sizes', rule, {
  valid: [
    {
      code: 'const style = `margin: ${theme.sys.spacing(1)}};`'
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme.sys.spacing(2) }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const style = `margin: ${theme.sizes[1]};`',
      output: 'const style = `margin: ${theme.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme.sizes[0]};`',
      output: 'const style = `margin: ${theme.sys.spacing(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${sizes[5]};`',
      output: 'const style = `margin: ${theme.sys.spacing(5)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: sizes[5] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sys.spacing(5) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme?.sizes[1]};`',
      output: 'const style = `margin: ${theme?.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme.sizes?.[0]};`',
      output: 'const style = `margin: ${theme?.sys.spacing(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${sizes?.[5]};`',
      output: 'const style = `margin: ${theme?.sys.spacing(5)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme?.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme?.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: sizes?.[5] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme?.sys.spacing(5) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme?.sizes[1]};`',
      output: 'const style = `margin: ${theme?.sys.spacing[1]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
      options: [{type: 'property'}]
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme?.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme?.sys.spacing[1] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
      options: [{type: 'property'}]
    },
  ]
})
