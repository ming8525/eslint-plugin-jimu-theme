/**
 * @fileoverview This rule is disallow directly access theme.colors in variable assignment.
 * @author ming8525
 */
"use strict";

const { isSpecifiedMemberExpressionNode } = require('./utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow directly access theme.colors.palette in variable assignment',
      recommended: false,
    },
    messages: {
      message: 'Do not directly access `theme.colors.palette` in variable assignment.',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors', 'palette'])) {
          if (!node.init.computed) {
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