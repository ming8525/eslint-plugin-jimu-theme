'use strict'
const { isSpecifiedMemberExpressionNode } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow directly access `theme.colors` or `theme.colors.palette` in variable assignment. Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios.',
      recommended: false,
    },
    messages: {
      message: 'Do not directly access `theme.colors` or `theme.colors.palette` in variable assignment.',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors']) || isSpecifiedMemberExpressionNode(node.init, ['props', 'theme', 'colors'])) {
          if (node.init && !node.init.computed) {
            context.report({
              node,
              messageId: 'message',
            })
          }
        } else if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors', 'palette']) || isSpecifiedMemberExpressionNode(node.init, ['props', 'theme', 'colors', 'palette'])) {
          if (node.init && !node.init.computed) {
            context.report({
              node,
              messageId: 'message',
            })
          }
        }
      }
    }
  },
}