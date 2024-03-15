const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/prefer-direct-variables-access')

ruleTester.run('prefer-direct-variables-access', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.colors.primary};`'
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[300]};`'
    },
    {
      code: 'const style = `border-color: ${border?.color};`'
    },
  ],

  invalid: [
    {
      code: 'const style = `border-color: ${colors.primary};`',
      output: 'const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.white};`',
      output: 'const style = `border-color: ${theme?.colors?.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.light};`',
      output: 'const style = `border-color: ${theme?.colors?.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.transparent};`',
      output: 'const style = `border-color: ${theme?.colors?.transparent};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors?.palette.danger[500]};`',
      output: 'const style = `border-color: ${theme?.colors?.palette.danger[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${colors.palette?.light[300]};`',
      output: 'const style = `border-color: ${theme?.colors.palette?.light[300]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${palette?.light[200]};`',
      output: 'const style = `border-color: ${theme?.colors?.palette?.light[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ borderColor: colors.primary }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.colors.primary }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: colors.palette.primary[100] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.colors.palette.primary[100] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${props.theme.colors.primary};`',
      output: 'const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${props?.theme?.colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme?.colors.palette.primary[100]};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: props.theme.colors?.primary }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.colors?.primary }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: props?.theme?.colors.palette.primary[100] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.colors.palette.primary[100] }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: palette?.primary[100] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.colors?.palette?.primary[100] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses?.sm }} /> }',
      output: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses?.sm }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: props.theme.border?.color }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.border?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${border?.color};`',
      output: 'const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
      options: [{applyToBorder: true }]
    },
    {
      code: 'const component = () => { return <div style={{ outlineColor: props.theme.focusedStyles?.color }} /> }',
      output: 'const component = () => { return <div style={{ outlineColor: theme.focusedStyles?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: props.theme.boxShadows?.default }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows?.default }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme.sizes?.[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sizes?.[1] }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${sizes?.[2]};`',
      output: 'const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme.typography.variants?.display1 }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.typography.variants?.display1 }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ fontWeight: props.theme.typography.weights?.bold }} /> }',
      output: 'const component = () => { return <div style={{ fontWeight: theme.typography.weights?.bold }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-size: ${typography?.sizes.body1};`',
      output: 'const style = `font-size: ${theme?.typography?.sizes.body1};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.typography.colors?.title }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.typography.colors?.title }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `line-height: ${typography?.lineHeights.sm};`',
      output: 'const style = `line-height: ${theme?.typography?.lineHeights.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.header.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.header.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${footer?.bg};`',
      output: 'const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.link.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.link.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ color: props.theme.body.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.body.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-size: ${body?.fontSize};`',
      output: 'const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
  ],
})
