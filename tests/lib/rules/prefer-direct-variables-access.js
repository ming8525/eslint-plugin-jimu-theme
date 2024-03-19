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
      code: 'const colors = theme.colors; const style = `border-color: ${colors.primary};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors?.white};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme?.colors?.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors?.light};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme?.colors?.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors?.transparent};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme?.colors?.transparent};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors.palette.primary[100]};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors?.palette.danger[500]};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme?.colors?.palette.danger[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = theme.colors; const style = `border-color: ${colors.palette?.light[300]};`',
      output: 'const colors = theme.colors; const style = `border-color: ${theme?.colors.palette?.light[300]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = theme.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = theme.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = theme.colors.palette; const style = `border-color: ${palette?.light[200]};`',
      output: 'const palette = theme.colors.palette; const style = `border-color: ${theme?.colors?.palette?.light[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { const colors = theme.colors; return <div style={{ borderColor: colors.primary }} /> }',
      output: 'const component = () => { const colors = theme.colors; return <div style={{ borderColor: theme.colors.primary }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const colors = theme.colors; return <div style={{ borderColor: colors.palette.primary[100] }} /> }',
      output: 'const component = () => { const colors = theme.colors; return <div style={{ borderColor: theme.colors.palette.primary[100] }} /> }',
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
      code: 'const palette = theme.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = theme.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const palette = theme.colors.palette; return <div style={{ borderColor: palette?.primary[100] }} /> }',
      output: 'const component = () => { const palette = theme.colors.palette; return <div style={{ borderColor: theme?.colors?.palette?.primary[100] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ borderRadius: props.theme.borderRadiuses?.sm }} /> }',
      output: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses?.sm }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const borderRadiuses = theme.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: props.theme.border?.color }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.border?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const border = theme.border; const style = `border-color: ${border?.color};`',
      output: 'const border = theme.border; const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
    },
    {
      code: 'const component = () => { return <div style={{ outlineColor: props.theme.focusedStyles?.color }} /> }',
      output: 'const component = () => { return <div style={{ outlineColor: theme.focusedStyles?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = theme.focusedStyles; const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: props.theme.boxShadows?.default }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows?.default }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const boxShadows = theme.boxShadows; const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const boxShadows = theme.boxShadows; const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme.sizes?.[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sizes?.[1] }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = theme.sizes; const style = `margin: ${sizes?.[2]};`',
      output: 'const sizes = theme.sizes; const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: props.theme.typography.variants?.display1 }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.typography.variants?.display1 }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = theme.typography; const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const typography = theme.typography; const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ fontWeight: props.theme.typography.weights?.bold }} /> }',
      output: 'const component = () => { return <div style={{ fontWeight: theme.typography.weights?.bold }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = theme.typography; const style = `font-size: ${typography?.sizes.body1};`',
      output: 'const typography = theme.typography; const style = `font-size: ${theme?.typography?.sizes.body1};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.typography.colors?.title }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.typography.colors?.title }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = theme.typography; const style = `line-height: ${typography?.lineHeights.sm};`',
      output: 'const typography = theme.typography; const style = `line-height: ${theme?.typography?.lineHeights.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.header.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.header.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const footer = theme.footer; const style = `background: ${footer?.bg};`',
      output: 'const footer = theme.footer; const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: props.theme.link.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.link.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const link = theme.link; const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const link = theme.link; const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ color: props.theme.body.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.body.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const body = theme.body; const style = `font-size: ${body?.fontSize};`',
      output: 'const body = theme.body; const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { const surfaces = theme.surfaces; return <div style={{ background: surfaces[1].bg }} /> }',
      output: 'const component = () => { const surfaces = theme.surfaces; return <div style={{ background: theme.surfaces[1].bg }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `border-color: ${surfaces?.[1].border.color};`',
      output: 'const surfaces = theme.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ background: props.theme.surfaces[1].bg }} /> }',
      output: 'const component = () => { return <div style={{ background: theme.surfaces[1].bg }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `border-color: ${props.theme?.surfaces?.[1].border.color};`',
      output: 'const surfaces = theme.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { const colors = props.theme.colors; return <div style={{ borderColor: colors.primary }} /> }',
      output: 'const component = () => { const colors = props.theme.colors; return <div style={{ borderColor: theme.colors.primary }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const colors = props.theme.colors; const style = `border-color: ${colors.primary};`',
      output: 'const colors = props.theme.colors; const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = props.theme.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = props.theme.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = props.theme.surfaces; const style = `border-color: ${props.theme?.surfaces?.[1].border.color};`',
      output: 'const surfaces = props.theme.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const body = props.theme.body; const style = `font-size: ${body?.fontSize};`',
      output: 'const body = props.theme.body; const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const link = props.theme.link; const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const link = props.theme.link; const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const footer = props.theme.footer; const style = `background: ${footer?.bg};`',
      output: 'const footer = props.theme.footer; const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const header = props.theme.header; const style = `background: ${header?.bg};`',
      output: 'const header = props.theme.header; const style = `background: ${theme?.header?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = props.theme.typography; const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const typography = props.theme.typography; const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = props.theme.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = props.theme.focusedStyles; const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = props.theme.sizes; const style = `margin: ${sizes?.[2]};`',
      output: 'const sizes = props.theme.sizes; const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const boxShadows = props.theme.boxShadows; const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const boxShadows = props.theme.boxShadows; const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const border = props.theme.border; const style = `border-color: ${border?.color};`',
      output: 'const border = props.theme.border; const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
    },
    {
      code: 'const borderRadiuses = props.theme.borderRadiuses; const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const borderRadiuses = props.theme.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const colors = theme?.colors; const style = `border-color: ${colors.primary};`',
      output: 'const colors = theme?.colors; const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = theme?.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = theme?.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = theme?.colors?.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = theme?.colors?.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme?.surfaces; const style = `border-color: ${props.theme?.surfaces?.[1].border.color};`',
      output: 'const surfaces = theme?.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const body = theme?.body; const style = `font-size: ${body?.fontSize};`',
      output: 'const body = theme?.body; const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const link = theme?.link; const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const link = theme?.link; const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const footer = theme?.footer; const style = `background: ${footer?.bg};`',
      output: 'const footer = theme?.footer; const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const header = theme?.header; const style = `background: ${header?.bg};`',
      output: 'const header = theme?.header; const style = `background: ${theme?.header?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = theme?.typography; const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const typography = theme?.typography; const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = theme?.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = theme?.focusedStyles; const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = theme?.sizes; const style = `margin: ${sizes?.[2]};`',
      output: 'const sizes = theme?.sizes; const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const boxShadows = theme?.boxShadows; const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const boxShadows = theme?.boxShadows; const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const border = theme?.border; const style = `border-color: ${border?.color};`',
      output: 'const border = theme?.border; const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
    },
    {
      code: 'const borderRadiuses = theme?.borderRadiuses; const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const borderRadiuses = theme?.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const colors = props.theme?.colors; const style = `border-color: ${colors.primary};`',
      output: 'const colors = props.theme?.colors; const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = props.theme?.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = props.theme?.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = props.theme?.colors?.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = props.theme?.colors?.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = props.theme?.surfaces; const style = `border-color: ${props.theme?.surfaces?.[1].border.color};`',
      output: 'const surfaces = props.theme?.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const body = props.theme?.body; const style = `font-size: ${body?.fontSize};`',
      output: 'const body = props.theme?.body; const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const link = props.theme?.link; const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const link = props.theme?.link; const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const footer = props.theme?.footer; const style = `background: ${footer?.bg};`',
      output: 'const footer = props.theme?.footer; const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const header = props.theme?.header; const style = `background: ${header?.bg};`',
      output: 'const header = props.theme?.header; const style = `background: ${theme?.header?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = props.theme?.typography; const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const typography = props.theme?.typography; const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = props.theme?.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = props.theme?.focusedStyles; const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = props.theme?.sizes; const style = `margin: ${sizes?.[2]};`',
      output: 'const sizes = props.theme?.sizes; const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const boxShadows = props.theme?.boxShadows; const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const boxShadows = props.theme?.boxShadows; const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const border = props.theme?.border; const style = `border-color: ${border?.color};`',
      output: 'const border = props.theme?.border; const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
    },
    {
      code: 'const borderRadiuses = props.theme?.borderRadiuses; const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const borderRadiuses = props.theme?.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const colors = this.props.theme?.colors; const style = `border-color: ${colors.primary};`',
      output: 'const colors = this.props.theme?.colors; const style = `border-color: ${theme.colors.primary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = this.props.theme?.colors.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = this.props.theme?.colors.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const palette = this.props.theme?.colors?.palette; const style = `border-color: ${palette.primary[100]};`',
      output: 'const palette = this.props.theme?.colors?.palette; const style = `border-color: ${theme.colors.palette.primary[100]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = this.props.theme?.surfaces; const style = `border-color: ${surfaces?.[1].border.color};`',
      output: 'const surfaces = this.props.theme?.surfaces; const style = `border-color: ${theme?.surfaces?.[1].border.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const body = this.props.theme?.body; const style = `font-size: ${body?.fontSize};`',
      output: 'const body = this.props.theme?.body; const style = `font-size: ${theme?.body?.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const link = this.props.theme?.link; const style = `text-decoration: ${link?.hover.decoration};`',
      output: 'const link = this.props.theme?.link; const style = `text-decoration: ${theme?.link?.hover.decoration};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const footer = this.props.theme?.footer; const style = `background: ${footer?.bg};`',
      output: 'const footer = this.props.theme?.footer; const style = `background: ${theme?.footer?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const header = this.props.theme?.header; const style = `background: ${header?.bg};`',
      output: 'const header = this.props.theme?.header; const style = `background: ${theme?.header?.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const typography = this.props.theme?.typography; const style = `margin: ${typography?.variants.display1.color};`',
      output: 'const typography = this.props.theme?.typography; const style = `margin: ${theme?.typography?.variants.display1.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const focusedStyles = this.props.theme?.focusedStyles; const style = `outline-color: ${focusedStyles?.color};`',
      output: 'const focusedStyles = this.props.theme?.focusedStyles; const style = `outline-color: ${theme?.focusedStyles?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const sizes = this.props.theme?.sizes; const style = `margin: ${sizes?.[2]};`',
      output: 'const sizes = this.props.theme?.sizes; const style = `margin: ${theme?.sizes?.[2]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const boxShadows = this.props.theme?.boxShadows; const style = `box-shadow: ${boxShadows?.sm};`',
      output: 'const boxShadows = this.props.theme?.boxShadows; const style = `box-shadow: ${theme?.boxShadows?.sm};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const border = this.props.theme?.border; const style = `border-color: ${border?.color};`',
      output: 'const border = this.props.theme?.border; const style = `border-color: ${theme?.border?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }],
    },
    {
      code: 'const borderRadiuses = this.props.theme?.borderRadiuses; const style = `border-radius: ${borderRadiuses?.default};`',
      output: 'const borderRadiuses = this.props.theme?.borderRadiuses; const style = `border-radius: ${theme?.borderRadiuses?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const component = () => { return <div style={{ borderRadius: this.props.theme.borderRadiuses?.sm }} /> }',
      output: 'const component = () => { return <div style={{ borderRadius: theme.borderRadiuses?.sm }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: this.props.theme.border?.color }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.border?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ outlineColor: this.props.theme.focusedStyles?.color }} /> }',
      output: 'const component = () => { return <div style={{ outlineColor: theme.focusedStyles?.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ boxShadow: this.props.theme.boxShadows?.default }} /> }',
      output: 'const component = () => { return <div style={{ boxShadow: theme.boxShadows?.default }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: this.props.theme.sizes?.[1] }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.sizes?.[1] }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ margin: this.props.theme.typography.variants?.display1 }} /> }',
      output: 'const component = () => { return <div style={{ margin: theme.typography.variants?.display1 }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ fontWeight: this.props.theme.typography.weights?.bold }} /> }',
      output: 'const component = () => { return <div style={{ fontWeight: theme.typography.weights?.bold }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: this.props.theme.typography.colors?.title }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.typography.colors?.title }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: this.props.theme.header.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.header.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: this.props.theme.link.color }} /> }',
      output: 'const component = () => { return <div style={{ color: theme.link.color }} /> }',
      errors: [{ messageId: 'noUsedFromProps', type: 'MemberExpression' }]
    },
  ],
})
