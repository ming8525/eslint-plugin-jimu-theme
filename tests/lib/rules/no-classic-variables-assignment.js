const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-variables-assignment')

ruleTester.run('no-classic-variables-assignment', rule, {
  valid: [
    {
      code: 'const primary = theme.colors.palette.primary'
    }
  ],

  invalid: [
    {
      code: 'const colors = theme.colors',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.colors.palette',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const borderRadiuses = theme?.borderRadiuses',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme?.borderRadiuses',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.border',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.border',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.header',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.body',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.footer',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.link',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.focusedStyles',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.focusedStyles',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme.sizes',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme?.sizes',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = theme?.typography',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.typography',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },

    {
      code: 'const palette = theme?.surfaces',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.surfaces',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },

    {
      code: 'const palette = theme?.surfaces[2]',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = props.theme.surfaces[1]',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },

    {
      code: 'const palette = this.props.theme?.borderRadiuses',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.border',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.body',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.link',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.focusedStyles',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme?.sizes',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.typography',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.surfaces',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
    {
      code: 'const palette = this.props.theme.surfaces[1]',
      errors: [{ messageId: 'message', type: 'VariableDeclarator' }]
    },
  ],
})
