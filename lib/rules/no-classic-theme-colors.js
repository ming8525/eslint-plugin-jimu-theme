"use strict";
const { isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, getColorVariableMappingInNewTheme, ThemeAllColors } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colors` to the new version.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme.",
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', ThemeAllColors])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.property.name, null, otional)
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
