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
      description: 'disallow directly access theme.colors in variable assignment',
      recommended: false,
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors'])) {
          if (!node.init.computed) {
            context.report({
              node,
              message: 'Do not directly access `theme.colors` in variable assignment.',
            });
          }
        }
      }
    };
  },
};