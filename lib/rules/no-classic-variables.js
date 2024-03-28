'use strict'
const {
  DocURL,
  matchNodeIdentifiers,
  DefaultPreThemeProps,
  DefaultThemeAliases,
  ThemeAllColors,
  ThemeLightDarkColors,
  ThemePaletteShades,
  TypographyVariantsMap,
  TypographyColorsMap,
  TypographyStylesMap,
  TypographyWeightsMap,
  TypographyLineHeightsMap,
  FontStyles,
  flattenUnique,
  reportMessages,
  messagesForSpecialCase
} = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule updates variables from old classic theme to new theme.',
      recommended: false,
      url: `${DocURL}no-classic-variables.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Theme variable upgraded from \'{{oldVar}}\' to \'{{newVar}}\' to align with the new theme.',
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
        if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'colors', [...ThemeAllColors, 'transparent']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'colors', 'palette', ThemeLightDarkColors, ThemePaletteShades], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'colors', 'orgSharedColors', ['header', 'body', 'button'], ['color', 'bg', 'link']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'border', ['type', 'color', 'width']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'borderRadiuses', ['none', 'sm', 'default', 'lg']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'boxShadows', ['none', 'sm', 'default', 'lg']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'sizes', ['0', '1', '2', '3', '4', '5', '6']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'surfaces', ['1', '2'], ['bg', 'shadow']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'surfaces', ['1', '2'], 'border', ['color', 'width', 'type']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'surfaces', ['1', '2'],], variables, allowedThemeProps))) {
          messagesForSpecialCase.surface(node, context, props)
        } if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], variables, allowedThemeProps))) {
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
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'focusedStyles', ['offset', 'color', 'width']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'header', ['color', 'bg']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'footer', ['color', 'bg']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'body', ['color', 'bg', ...FontStyles]], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'link', ['color', 'decoration']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'link', 'hover', ['color', 'decoration']], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'darkTheme'], variables, allowedThemeProps))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
