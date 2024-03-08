import { isSpecifiedMemberExpressionNode } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule = createRule({
  create(context) {
    return {
      VariableDeclarator(node) {
        if (isSpecifiedMemberExpressionNode(node.init, ['theme', 'colors', 'palette'])) {
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
  name: 'no-classic-theme-palette-access-directly',
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow directly access theme.colors.palette in variable assignment'
    },
    messages: {
      message: 'Do not directly access `theme.colors.palette` in variable assignment.'
    },
    schema: [],
  },
  defaultOptions: []
})

export default rule