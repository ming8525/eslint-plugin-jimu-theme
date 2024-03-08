"use strict";
const { isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, getColorVariableMappingInNewTheme, ThemeAllColors, ThemePaletteShades, ThemeLightDarkColors } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colors.palette` to the new version.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [],
    messages: {
      message: "Unexpected usage of theme palette of classic theme.",
    },
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.object.property.name, node.property.raw, otional)
          context.report({
            node: node,
            messageId: "message",
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
};
