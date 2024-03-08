import { isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, ThemeAllColors } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);


const rule = createRule({
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['colors', ThemeAllColors])) {
          const sourceCode = context.getSourceCode();
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'colors')
          const p1 = optional ? 'theme?.' : 'theme.'
          const fixedText = `${p1}${rawCode}`
          context.report({
            node: node,
            messageId: 'message',
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  },
  name: 'no-classic-colors-directly',
  meta: {
    docs: {
      description: "This rule is used to assist identify code that directly uses `colors.<color>` to access theme variables without using `theme.` as prefix.",
    },
    type: 'suggestion',
    fixable: 'code',
    messages: {
      message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme directly.",
    },
    schema: [],
  },
  defaultOptions: []
})

export default rule
