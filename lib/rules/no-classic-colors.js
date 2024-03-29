'use strict'
const {
  DocURL,
  getMatchNodeIdentifiers,
  reportMessages,
  flattenUnique,
  DefaultPreThemeProps,
  DefaultThemeAliases,
  ThemeAllColors,
  ThemeLightDarkColors,
  ThemePaletteShades
} = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule updates `colors` variables from old classic theme to new theme.',
      recommended: false,
      url: `${DocURL}no-classic-colors.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Color variable upgraded from \'{{oldVar}}\' to \'{{newVar}}\' to align with the new theme.',
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
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              ],
            },
            default: ['this', '[\'this\', \'props\', \'prevProps\', \'pageContext\']'],
            description: `This property is used to define the expression before the \`theme\` keyword. This plug-in identifies theme variables based on full-length expression matching.
            For example, by default we will identify \`this.props.theme.<variable>\` but not \`this.nextProps.theme.<variable>\`, because this.nextProps does not exist in the default \`preThemeProps\`. The latter can be identified by identifying preThemeProps as \`[this, ['props', 'nextProps']]\`.`
          },
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
        let props = null
        if ((props = getMatchNodeIdentifiers(node, { value: [themeAliases, 'colors', [...ThemeAllColors, 'transparent']], stop: themeAliases }, { value: variables, times: 1 }))) {
          reportMessages(node, context, props)
        } else if ((props = getMatchNodeIdentifiers(node, { value: [themeAliases, 'colors', 'palette', ThemeLightDarkColors, ThemePaletteShades], stop: themeAliases }, { value: variables, times: 1 }))) {
          reportMessages(node, context, props)
        } else if ((props = getMatchNodeIdentifiers(node, { value: [themeAliases, 'colors', 'orgSharedColors', ['header', 'body', 'button'], ['color', 'bg', 'link']], stop: themeAliases }, { value: variables, times: 1 }))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
