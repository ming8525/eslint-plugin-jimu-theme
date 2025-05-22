'use strict'
const { DocURL, getMatchNodeIdentifiers, DefaultThemeAliases, NewThemeColors, ThemeNeutralPaletteShades } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule is used to check whether a theme ref palette variable is being used.',
      recommended: false,
      url: `${DocURL}no-ref-palette.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Theme `ref.palette` variables should not be used, please use the `sys.color` variable instead.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          themeAliases: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: DefaultThemeAliases,
            description: 'The plug-in determines whether a variable is a theme variable based on the "theme" keyword. If you use another name, define it through this property.'
          },
          allowBlackAndWhite: {
            type: 'boolean',
            default: true,
            description: 'Whether to allow black and white of palette to be used. Default is true.',
          }
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const option = context.options[0] || {}

    const themeAliases = option.themeAliases || DefaultThemeAliases
    const allowBlackAndWhite = option.allowBlackAndWhite ?? true
    return {
      MemberExpression(node) {
        const variables = context.sourceCode.getScope(node).variables
        if ((getMatchNodeIdentifiers(node, { value: [themeAliases, 'ref', 'palette', NewThemeColors, ThemeNeutralPaletteShades], stop: themeAliases }, { value: variables, level: 2 }, true))) {
          context.report({
            node: node,
            messageId: 'message',
          })
        } else if ((getMatchNodeIdentifiers(node, { value: [themeAliases, 'ref', 'palette', ['black', 'white']], stop: themeAliases }, { value: variables, level: 2 }, true))) {
          if (!allowBlackAndWhite) {
            context.report({
              node: node,
              messageId: 'message',
            })
          }
        }
      }
    }
  }
}
