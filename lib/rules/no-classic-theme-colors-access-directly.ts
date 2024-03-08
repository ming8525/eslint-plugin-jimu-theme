import { isSpecifiedMemberExpressionNode } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule = createRule({
  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors'])) {
          if (!node.init.computed) {
            context.report({
              node,
              messageId: 'message',
            });
          }
        }
      }
    };
  },
  name: 'no-classic-theme-colors-access-directly',
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow directly access theme.colors in variable assignment',
    },
    schema: [],
    messages: {
      message: "Do not directly access `theme.colors` in variable assignment.",
    }
  },
  defaultOptions: []
})

export default rule
