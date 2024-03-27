'use strict'
const {
  DocURL,
  matchNodeIdentifiers,
  reportMessages,
  flattenUnique,
  DefaultPreThemeProps,
  DefaultThemeAliases,
} = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'This rule facilitates the deprecation of sizes variables in the classic theme and provides automatic fixes to replace these sizes variables with variables from the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-sizes.md`,
    },
    fixable: 'code',
    messages: {
      message:
        'Deprecate classic theme sizes variables and replace them with variables from the new theme. (\'{{oldVar}}\' → \'{{newVar}}\')',
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
          preThemeProps: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: DefaultPreThemeProps
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const option = context.options[0] || {}
    const preThemeProps = option.preThemeProps || DefaultPreThemeProps
    const themeAliases = option.themeAliases || DefaultThemeAliases
    const allowedThemeProps = flattenUnique(preThemeProps.concat(themeAliases))
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if (
          (props = matchNodeIdentifiers(
            node,
            [
              ...preThemeProps,
              themeAliases,
              'sizes',
              ['0', '1', '2', '3', '4', '5', '6'],
            ],
            variables,
            allowedThemeProps
          ))
        ) {
          reportMessages(node, context, props)
        }
      },
    }
  },
}
