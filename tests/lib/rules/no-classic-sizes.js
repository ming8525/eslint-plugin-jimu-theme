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
      code: 'const component = () => { return <div style={{ margin: theme.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme?.sizes[1]};`',
      output: 'const style = `margin: ${theme?.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${theme.sizes?.[0]};`',
      output: 'const style = `margin: ${theme.sys.spacing?.(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme?.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme?.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const style = `margin: ${props.theme.sizes[1]};`',
      output: 'const style = `margin: ${props.theme.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${props.theme.sizes[0]};`',
      output: 'const style = `margin: ${props.theme.sys.spacing(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: props.theme.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${props.theme?.sizes[1]};`',
      output: 'const style = `margin: ${props.theme?.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${props.theme.sizes?.[0]};`',
      output: 'const style = `margin: ${props.theme.sys.spacing?.(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme?.sizes[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: props.theme?.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const sizes = theme.sizes; const style = `margin: ${sizes[1]};`',
      output: 'const sizes = theme.sizes; const style = `margin: ${theme.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = theme.sizes; const style = `margin: ${sizes[0]};`',
      output: 'const sizes = theme.sizes; const style = `margin: ${theme.sys.spacing(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const sizes = theme.sizes; return <div style={{ margin: sizes[1] }} /> }',
      output: 'const component = () => { const sizes = theme.sizes; return <div style={{ margin: theme.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = theme.sizes; const style = `margin: ${theme?.sizes[1]};`',
      output: 'const sizes = theme.sizes; const style = `margin: ${theme?.sys.spacing(1)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = theme.sizes; const style = `margin: ${sizes?.[0]};`',
      output: 'const sizes = theme.sizes; const style = `margin: ${theme.sys.spacing?.(0)};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const sizes = theme.sizes; return <div style={{ margin: theme?.sizes[1] }} /> }',
      output: 'const component = () => { const sizes = theme.sizes; return <div style={{ margin: theme?.sys.spacing(1) }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
