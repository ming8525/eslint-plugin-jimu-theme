const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-elements')


ruleTester.run('no-classic-elements', rule, {
  valid: [
    {
      code: 'const style = `color: ${theme.comp.Header.root.vars.color};`'
    },
  ],

  invalid: [
    {
      code: 'const style = `color: ${theme.header.color};`',
      output: 'const style = `color: ${theme.comp.Header.root.vars.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.footer.color};`',
      output: 'const style = `color: ${theme?.comp.Footer.root.vars.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.footer?.color};`',
      output: 'const style = `color: ${theme.comp.Footer.root.vars?.color};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.link.color};`',
      output: 'const style = `color: ${theme?.sys.color.action.link.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.link?.color};`',
      output: 'const style = `color: ${theme?.sys.color.action.link?.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `text-decoration: ${theme?.link.decoration};`',
      output: 'const style = `text-decoration: ${\'none\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.link.color};`',
      output: 'const style = `color: ${theme?.sys.color.action.link.default};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.link?.hover.color};`',
      output: 'const style = `color: ${theme?.sys.color.action.link?.hover};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `text-decoration: ${theme?.link.hover.decoration};`',
      output: 'const style = `text-decoration: ${\'underline\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.bg};`',
      output: 'const style = `color: ${theme.sys.color.surface.background};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.color};`',
      output: 'const style = `color: ${theme.sys.color.surface.backgroundText};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.fontFamily};`',
      output: 'const style = `color: ${theme.sys.typography.body2.fontFamily};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.fontWeight};`',
      output: 'const style = `color: ${theme.sys.typography.body2.fontWeight};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.fontSize};`',
      output: 'const style = `color: ${theme.sys.typography.body2.fontSize};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.lineHeight};`',
      output: 'const style = `color: ${theme.sys.typography.body2.lineHeight};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body.fontStyle};`',
      output: 'const style = `color: ${\'unset\'};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.body.bg};`',
      output: 'const style = `color: ${theme?.sys.color.surface.background};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme.body?.color};`',
      output: 'const style = `color: ${theme.sys.color.surface?.backgroundText};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    },
    {
      code: 'const style = `color: ${theme?.body?.fontFamily};`',
      output: 'const style = `color: ${theme?.sys.typography.body2?.fontFamily};`',
      errors: [{ messageId: 'message', type: 'MemberExpression' }]
    }
  ]
})
