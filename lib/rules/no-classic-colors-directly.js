"use strict";
const { isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, ThemeAllColors } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist identify code that directly uses `colors.<color>` to access theme variables without using `theme.` as prefix.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: 'Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme directly.'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['colors', [...ThemeAllColors, 'transparent']])) {
          const sourceCode = context.sourceCode;
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'colors')
          const p1 = optional? 'theme?.' : 'theme.'
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
