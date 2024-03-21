'use strict'
const { DocURL, matchNodeIdentifiers, getVariableMappingInNewTheme, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades } = require('../utils')

function reportMessages(node, context, props) {
  const fixedText = getVariableMappingInNewTheme(props)
  const rawCode = context.sourceCode.getText(node)
  context.report({
    node: node,
    messageId: 'message',
    data: {
      oldVar: rawCode,
      newVar: fixedText
    },
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  })
}

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
        let props
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
