const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-shadow')


ruleTester.run('no-classic-shadow', rule, {
  valid: [
    {
      code: 'const style = `box-shadow: none;`'
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.sys.shadow.shadow2 }} /> }'
    },
    {
      code: 'const style = `box-shadow: none;`'
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.sys.shadow.shadow3 }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const style = `box-shadow: ${theme.boxShadows.default};`',
      output: 'const style = `box-shadow: ${theme.sys.shadow.shadow2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme.boxShadows.lg};`',
      output: 'const style = `box-shadow: ${theme.sys.shadow.shadow3};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme.boxShadows.none};`',
      output: 'const style = `box-shadow: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme.boxShadows.sm};`',
      output: 'const style = `box-shadow: ${theme.sys.shadow.shadow1};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows.default }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.sys.shadow.shadow2 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows.lg }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.sys.shadow.shadow3 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows.none }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: \'none\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows.sm }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.sys.shadow.shadow1 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme?.boxShadows.default};`',
      output: 'const style = `box-shadow: ${theme?.sys.shadow.shadow2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme.boxShadows?.lg};`',
      output: 'const style = `box-shadow: ${theme?.sys.shadow.shadow3};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme?.boxShadows.none};`',
      output: 'const style = `box-shadow: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${theme.boxShadows?.sm};`',
      output: 'const style = `box-shadow: ${theme?.sys.shadow.shadow1};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows?.default }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme?.sys.shadow.shadow2 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme?.boxShadows.lg }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme?.sys.shadow.shadow3 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme?.boxShadows.none }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: \'none\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows?.sm }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme?.sys.shadow.shadow1 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
  ]
})
