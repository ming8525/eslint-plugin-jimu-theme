"use strict";
const { isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, ThemeLightDarkColors, ThemePaletteShades } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist identify code that directly uses `colors.palette.<color>` to access theme variables without using `theme.` as prefix.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: 'Unexpected usage of palette variables from colors(assigned from `theme.colors`) of classic theme directly.'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['colors', 'palette', ThemeLightDarkColors, ThemePaletteShades])) {
          const sourceCode = context.sourceCode;
          const rawCode = sourceCode.getText(node)
          const optional = getMemberExpressionNodeOptinalObject(node, ['colors', 'palette'])
          const p1 = (optional.colors || optional.palette) ? 'theme?.' : 'theme.'
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
