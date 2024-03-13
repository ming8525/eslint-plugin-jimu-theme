'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, getColorVariableMappingInNewTheme, getSharedColorVariableMappingInNewTheme, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades } = require('../utils')

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
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', [...ThemeAllColors, 'transparent']])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.property.name, null, otional)
          context.report({
            node: node,
            messageId: 'message',
            data: {
              oldVar: node.property.name,
              newVar: fixedText
            },
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.object.property.name, node.property.raw, otional)
          context.report({
            node: node,
            messageId: 'message',
            data: {
              oldVar: node.object.property.name,
              newVar: fixedText
            },
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'orgSharedColors', ['header', 'body', 'button'], ['color', 'bg', 'link']])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'orgSharedColors'])
          const fixedText = getSharedColorVariableMappingInNewTheme(node.object.property.name, node.property.name, otional)
          context.report({
            node: node,
            messageId: 'message',
            data: {
              oldVar: node.object.property.name,
              newVar: fixedText
            },
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
}
