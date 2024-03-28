'use strict'
const {
  DocURL,
  matchNodeIdentifiers,
  reportMessages,
  TypographyVariantsMap,
  TypographyStylesMap,
  TypographyColorsMap,
  TypographyWeightsMap,
  TypographyLineHeightsMap,
  flattenUnique,
  DefaultPreThemeProps,
  DefaultThemeAliases,
} = require('../utils')
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of `typography` variables in the classic theme and provides automatic fixes to replace these typography variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-colors.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme typography variables and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
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
    const preThemeProps = option.preThemeProps || DefaultPreThemeProps
    const themeAliases = option.themeAliases || DefaultThemeAliases
    const allowedThemeProps = flattenUnique(preThemeProps.concat(themeAliases))
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'variants', Object.keys(TypographyVariantsMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'sizes', Object.keys(TypographyVariantsMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'colors', Object.keys(TypographyColorsMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'weights', Object.keys(TypographyWeightsMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', ['fontFamilyBase', 'fontSizeRoot', 'fontSizeBase']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
