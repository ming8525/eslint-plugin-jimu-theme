'use strict'
const {
  DocURL,
  FontStyles,
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
        'This rule facilitates the deprecation of elements(e.g header, footer, body, link) variables in the classic theme and provides automatic fixes to replace these elements variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-elements.md`,
    },
    fixable: 'code',
    messages: {
      message:
        'Deprecate classic theme elements(e.g header, footer, body, link) variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
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
              'header',
              ['color', 'bg'],
            ],
            variables,
            allowedThemeProps
          ))
        ) {
          reportMessages(node, context, props)
        } else if (
          (props = matchNodeIdentifiers(
            node,
            [
              ...preThemeProps,
              themeAliases,
              'footer',
              ['color', 'bg'],
            ],
            variables,
            allowedThemeProps
          ))
        ) {
          reportMessages(node, context, props)
        } else if (
          (props = matchNodeIdentifiers(
            node,
            [
              ...preThemeProps,
              themeAliases,
              'body',
              ['color', 'bg', ...FontStyles],
            ],
            variables,
            allowedThemeProps
          ))
        ) {
          reportMessages(node, context, props)
        } else if (
          (props = matchNodeIdentifiers(
            node,
            [
              ...preThemeProps,
              themeAliases,
              'link',
              ['color', 'decoration'],
            ],
            variables,
            allowedThemeProps
          ))
        ) {
          reportMessages(node, context, props)
        } else if (
          (props = matchNodeIdentifiers(
            node,
            [
              ...preThemeProps,
              themeAliases,
              'link',
              'hover',
              ['color', 'decoration'],
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
