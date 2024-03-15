const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-typography')


ruleTester.run('no-classic-typography', rule, {
  valid: [
    {
      code: 'const style = `font-size: ${theme.sys.typography.h2.fontSize};`'
    },
  ],

  invalid: [
    {
      code: 'const style = `font-size: ${theme.typography.sizes.display2};`',
      output: 'const style = `font-size: ${theme.sys.typography.h2.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ fontSize: theme?.typography.sizes.display2 }} /> }',
      output: 'const component = () => { return <div style={{ fontSize: theme?.sys.typography.h2.fontSize }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.typography.colors.title};`',
      output: 'const style = `color: ${theme.sys.color.surface.backgroundText};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ color: theme?.typography.colors.disabled }} /> }',
      output: 'const component = () => { return <div style={{ color: theme?.sys.color.action.disabled.text }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-weight: ${theme.typography.weights.extraLight};`',
      output: 'const style = `font-weight: ${theme.ref.typeface.fontWeightLight};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ fontWeight: theme?.typography.weights.bold }} /> }',
      output: 'const component = () => { return <div style={{ fontWeight: theme?.ref.typeface.fontWeightMedium }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `line-height: ${theme.typography.lineHeights.medium};`',
      output: 'const style = `line-height: ${1.5};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ lineHeight: theme?.typography.lineHeights.sm }} /> }',
      output: 'const component = () => { return <div style={{ lineHeight: 1.3 }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={theme.typography.variants.display2} /> }',
      output: 'const component = () => { return <div style={theme.sys.typography.h2} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={theme.typography.variants.caption2} /> }',
      output: 'const component = () => { return <div style={theme.sys.typography.label3} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-family: ${theme.typography.variants.caption1.fontFamily};`',
      output: 'const style = `font-family: ${theme.sys.typography.label2.fontFamily};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.typography.variants.body2.color};`',
      output: 'const style = `color: ${theme.sys.color.surface.paperText};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-size: ${theme?.typography.variants.display2};`',
      output: 'const style = `font-size: ${theme?.sys.typography.h2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-size: ${theme.typography.variants?.caption2};`',
      output: 'const style = `font-size: ${theme.sys.typography?.label3};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `font-family: ${theme?.typography.variants?.caption1.fontFamily};`',
      output: 'const style = `font-family: ${theme?.sys.typography?.label2.fontFamily};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={theme?.typography.variants.display2} /> }',
      output: 'const component = () => { return <div style={theme?.sys.typography.h2} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={theme.typography.variants?.caption2} /> }',
      output: 'const component = () => { return <div style={theme.sys.typography?.label3} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
  ]
})
