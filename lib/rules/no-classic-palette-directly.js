"use strict";
const { isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, ThemePaletteShades, ThemeLightDarkColors } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist identify code that directly uses `palette.<color>` to access theme variables without using `theme.colors` as prefix.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: "Unexpected usage of variables from colors(assigned from `theme.colors.palette`) of classic theme directly.",
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const sourceCode = context.sourceCode;
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'palette')
          const p1 = optional ? 'theme?.colors?.' : 'theme.colors.'
          const fixedText = `${p1}${rawCode}`
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
