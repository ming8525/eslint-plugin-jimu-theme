'use strict'
const { DocURL, matchNodeIdentifiers, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades, TypographyVariantsMap, TypographyColorsMap, TypographyStylesMap, TypographyWeightsMap, TypographyLineHeightsMap, FontStyles, reportMessages } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule updates color variables from old classic theme to new theme.',
      recommended: false,
      url: `${DocURL}no-classic-variables.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Theme variable upgraded from \'{{oldVar}}\' to \'{{newVar}}\' to align with the new theme.',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'colors', [...ThemeAllColors, 'transparent']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'colors', 'palette', ThemeLightDarkColors, ThemePaletteShades], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'colors', 'orgSharedColors', ['header', 'body', 'button'], ['color', 'bg', 'link']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'border', ['type', 'color', 'width']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'borderRadiuses', ['none', 'sm', 'default', 'lg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'boxShadows', ['none', 'sm', 'default', 'lg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'sizes', ['0', '1', '2', '3', '4', '5', '6']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'surfaces', ['1', '2'], ['bg', 'shadow']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'surfaces', ['1', '2'], 'border', ['color', 'width', 'type']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'variants', Object.keys(TypographyVariantsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'sizes', Object.keys(TypographyVariantsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'colors', Object.keys(TypographyColorsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'weights', Object.keys(TypographyWeightsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'focusedStyles',['offset', 'color', 'width']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'header', ['color', 'bg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'footer', ['color', 'bg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'body', ['color', 'bg', ...FontStyles]], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'link', ['color', 'decoration']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'link', 'hover', ['color', 'decoration']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'darkTheme'], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
