"use strict";
const { isSpecifiedMemberExpressionNode } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow directly access theme.colors in variable assignment',
      recommended: false,
    },
    messages: {
      message: 'Do not directly access `theme.colors` in variable assignment.',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors'])) {
          if (node.init && !node.init.computed) {
            context.report({
              node,
              messageId: "message",
            });
          }
        }
      }
    };
  },
};