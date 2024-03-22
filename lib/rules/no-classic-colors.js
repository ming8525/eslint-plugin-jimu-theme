'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule updates color variables from old classic theme to new theme.',
      recommended: false,
      url: `${DocURL}no-classic-colors.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Color variable upgraded from \'{{oldVar}}\' to \'{{newVar}}\' to align with the new theme.',
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
        }
      }
    }
  }
}
