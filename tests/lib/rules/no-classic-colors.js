const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-colors')


ruleTester.run('no-classic-colors', rule, {
  valid: [
    {
      code: 'const style = `border-color: ${theme.ref.palette.neutral[200]};`'
    },
    {
      code: 'const style = `border-color: ${theme.sys.color.primary.main};`'
    },
    {
      code: 'const style = `border-color: ${theme.mixin.sharedTheme?.button.bg};`'
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.neutral[200] }} /> }'
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.sys.color.primary.main}` }} /> }'
    },
    {
      code: 'const component = () => { return <div style={{ border: theme.mixin.sharedTheme?.button.bg }} /> }'
    }
  ],

  invalid: [
    {
      code: 'const style = `border-color: ${theme.colors.primary};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.white};`',
      output: 'const style = `border-color: ${theme.ref.palette.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.light};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.dark};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[1200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.primary};`',
      output: 'const style = `border-color: ${theme?.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.white};`',
      output: 'const style = `border-color: ${theme.ref.palette?.white};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors?.light};`',
      output: 'const style = `border-color: ${theme?.ref.palette?.neutral[200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.dark};`',
      output: 'const style = `border-color: ${theme?.ref.palette.neutral[1200]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.transparent};`',
      output: 'const style = `border-color: ${\'transparent\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.primary[500]};`',
      output: 'const style = `border-color: ${theme.sys.color.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.light[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette.dark[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette.neutral[1000]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.palette.primary[100]};`',
      output: 'const style = `border-color: ${theme?.sys.color.primary.light};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.palette.primary[500]};`',
      output: 'const style = `border-color: ${theme.sys.color?.primary.main};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors.palette?.light[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette?.neutral[500]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.palette.dark[500]};`',
      output: 'const style = `border-color: ${theme.ref.palette?.neutral[1000]};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.orgSharedColors.button.bg};`',
      output: 'const style = `border-color: ${theme.mixin.sharedTheme?.button.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.orgSharedColors.body.color};`',
      output: 'const style = `border-color: ${theme?.mixin.sharedTheme.body.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme.colors?.orgSharedColors.header.bg};`',
      output: 'const style = `border-color: ${theme.mixin.sharedTheme?.header.bg};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `border-color: ${theme?.colors.orgSharedColors.body.link};`',
      output: 'const style = `border-color: ${theme?.mixin.sharedTheme.body.link};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors.primary}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme.sys.color.primary.main}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.white }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.white }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.light }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.neutral[200] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.dark }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.neutral[1200] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.transparent }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: \'transparent\' }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors.transparent}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${\'transparent\'}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme?.colors.primary }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.sys.color.primary.main }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors?.white}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme.ref.palette?.white}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme?.colors?.light }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.ref.palette?.neutral[200] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme?.colors.dark}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme?.ref.palette.neutral[1200]}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.palette.primary[100] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.sys.color.primary.light }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors.palette.primary[500]}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme.sys.color.primary.main}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme.colors.palette.light[500] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme.ref.palette.neutral[500] }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors.palette.dark[500]}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme.ref.palette.neutral[1000]}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme?.colors.palette.primary[100] }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.sys.color.primary.light }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ border: `1px solid ${theme.colors?.orgSharedColors.button.bg}` }} /> }',
      output: 'const component = () => { return <div style={{ border: `1px solid ${theme.mixin.sharedTheme?.button.bg}` }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const component = () => { return <div style={{ borderColor: theme?.colors.orgSharedColors.body.link }} /> }',
      output: 'const component = () => { return <div style={{ borderColor: theme?.mixin.sharedTheme.body.link }} /> }',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
