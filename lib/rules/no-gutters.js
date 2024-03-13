'use strict'
const { isSpecifiedMemberExpressionNode } = require('../utils')

const GuttersMap = {
  0: '0px',
  1: '1px',
  2: '2px',
  3: '4px',
  4: '8px',
  5: '10px'
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of gutter variables in the theme and provides automatic fixes to replace these gutter variables with specific values.',
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate gutter variables in the theme and replace them with specific values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'gutters', ['0', '1', '2', '3', '4', '5']])) {
          const level = node.property.raw
          const fixedText = `'${GuttersMap[level]}'`
          context.report({
            node: node,
            messageId: 'message',
            data: {
              oldVar: node.property.raw,
              newVar: fixedText
            },
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
        if (isSpecifiedMemberExpressionNode(node, ['gutters', ['0', '1', '2', '3', '4', '5']])) {
          const level = node.property.raw
          const fixedText = `'${GuttersMap[level]}'`
          context.report({
            node: node,
            messageId: 'message',
            data: {
              oldVar: node.property.raw,
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
