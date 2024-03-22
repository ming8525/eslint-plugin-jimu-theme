const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-surface')


ruleTester.run('no-classic-surface', rule, {
  valid: [
    {
      code: 'const style = `background: ${theme.sys.color.surface.paper};`'
    },
    {
      code: 'const component = () => { return <div style={{ margin: theme.sys.color.surface.paper }} /> }'
    },
  ],

  invalid: [
    {
      code: 'const style = `background: ${theme.surfaces[1].bg};`',
      output: 'const style = `background: ${theme.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `boxShadow: ${theme.surfaces[1].shadow};`',
      output: 'const style = `boxShadow: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${theme.surfaces[1].border.color};`',
      output: 'const style = `borderColor: ${theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${theme.surfaces[2].bg};`',
      output: 'const style = `background: ${theme.sys.color.surface.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `boxShadow: ${theme.surfaces[2].shadow};`',
      output: 'const style = `boxShadow: ${theme.sys.shadow.shadow2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${theme.surfaces[2].border.color};`',
      output: 'const style = `borderColor: ${theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${theme?.surfaces[1].bg};`',
      output: 'const style = `background: ${theme?.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${theme.surfaces?.[1].border.color};`',
      output: 'const style = `borderColor: ${theme.sys.color.divider?.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${theme?.surfaces?.[2].bg};`',
      output: 'const style = `background: ${theme?.sys.color.surface?.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const style = `background: ${props.theme.surfaces[1].bg};`',
      output: 'const style = `background: ${props.theme.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `boxShadow: ${props.theme.surfaces[1].shadow};`',
      output: 'const style = `boxShadow: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${props.theme.surfaces[1].border.color};`',
      output: 'const style = `borderColor: ${props.theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${props.theme.surfaces[2].bg};`',
      output: 'const style = `background: ${props.theme.sys.color.surface.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `boxShadow: ${props.theme.surfaces[2].shadow};`',
      output: 'const style = `boxShadow: ${props.theme.sys.shadow.shadow2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${props.theme.surfaces[2].border.color};`',
      output: 'const style = `borderColor: ${props.theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${props.theme?.surfaces[1].bg};`',
      output: 'const style = `background: ${props.theme?.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `borderColor: ${props.theme.surfaces?.[1].border.color};`',
      output: 'const style = `borderColor: ${props.theme.sys.color.divider?.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `background: ${props.theme?.surfaces?.[2].bg};`',
      output: 'const style = `background: ${props.theme?.sys.color.surface?.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },

    {
      code: 'const surfaces = theme.surfaces; const style = `background: ${surfaces[1].bg};`',
      output: 'const surfaces = theme.surfaces; const style = `background: ${theme.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `boxShadow: ${surfaces[1].shadow};`',
      output: 'const surfaces = theme.surfaces; const style = `boxShadow: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `borderColor: ${surfaces[1].border.color};`',
      output: 'const surfaces = theme.surfaces; const style = `borderColor: ${theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `background: ${surfaces[2].bg};`',
      output: 'const surfaces = theme.surfaces; const style = `background: ${theme.sys.color.surface.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `boxShadow: ${surfaces[2].shadow};`',
      output: 'const surfaces = theme.surfaces; const style = `boxShadow: ${theme.sys.shadow.shadow2};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `borderColor: ${surfaces[2].border.color};`',
      output: 'const surfaces = theme.surfaces; const style = `borderColor: ${theme.sys.color.divider.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `background: ${theme?.surfaces[1].bg};`',
      output: 'const surfaces = theme.surfaces; const style = `background: ${theme?.sys.color.surface.paper};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `borderColor: ${surfaces?.[1].border.color};`',
      output: 'const surfaces = theme.surfaces; const style = `borderColor: ${theme.sys.color.divider?.secondary};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const surfaces = theme.surfaces; const style = `background: ${theme?.surfaces?.[2].bg};`',
      output: 'const surfaces = theme.surfaces; const style = `background: ${theme?.sys.color.surface?.overlay};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
