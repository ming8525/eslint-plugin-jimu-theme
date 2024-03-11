'use strict'
const { isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, getMemberExpressionNodeOptinalObject, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule ensures that theme colors are accessed directly through the theme object (e.g., theme.colors.primary) rather than via intermediary variables (e.g., colors.primary).',
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: 'Prefer accessing theme colors directly via theme.colors.* instead of using intermediary variables.'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['colors', [...ThemeAllColors, 'transparent']])) {
          const sourceCode = context.sourceCode
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'colors')
          const p1 = optional ? 'theme?.' : 'theme.'
          const fixedText = `${p1}${rawCode}`
          context.report({
            node: node,
            messageId: 'message',
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        } else if (isSpecifiedMemberExpressionNode(node, ['colors', 'palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const sourceCode = context.sourceCode
          const rawCode = sourceCode.getText(node)
          const optional = getMemberExpressionNodeOptinalObject(node, ['colors', 'palette'])
          const p1 = (optional.colors || optional.palette) ? 'theme?.' : 'theme.'
          const fixedText = `${p1}${rawCode}`
          context.report({
            node: node,
            messageId: 'message',
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        } else if (isSpecifiedMemberExpressionNode(node, ['palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const sourceCode = context.sourceCode
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'palette')
          const p1 = optional ? 'theme?.colors?.' : 'theme.colors.'
          const fixedText = `${p1}${rawCode}`
          context.report({
            node: node,
            messageId: 'message',
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
}
