'use strict'
const { DocURL, matchNodeIdentifiers, DefaultThemeAliases } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule is to check whether there are any remaining classical variables.',
      recommended: false,
      url: `${DocURL}no-classic-variables-left.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Classic theme variables should not exist.',
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
          }
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const option = context.options[0] || {}
    const themeAliases = option.themeAliases || DefaultThemeAliases
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        if (matchNodeIdentifiers(node, [themeAliases, ['colors', 'border', 'borderRadiuses', 'boxShadows', 'sizes', 'surfaces', 'typography', 'header', 'footer', 'body', 'link', 'darkTheme']], variables, themeAliases, false)) {
          context.report({
            node: node,
            messageId: 'message',
          })
        }
      }
    }
  }
}
