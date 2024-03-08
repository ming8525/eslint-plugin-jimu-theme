import { getColorVariableMappingInNewTheme, getMemberExpressionNodeOptinalObject, isSpecifiedMemberExpressionNode, ThemeAllColors } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule = createRule({
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
  },
  name: 'no-classic-theme-colors',
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colros` to the new version."
    },
    fixable: 'code',
    schema: [],
    messages: {
      message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme",
    },
  },
  defaultOptions: []
})

export default rule
