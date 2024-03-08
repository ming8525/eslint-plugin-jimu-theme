import { isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, ThemeAllColors, ThemePaletteShades } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule = createRule({
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['palette', ThemeAllColors, ThemePaletteShades])) {
          const sourceCode = context.getSourceCode();
          const rawCode = sourceCode.getText(node)
          const optional = isSpecifiedObjectOptinal(node, 'palette')
          const p1 = optional ? 'theme?.colors?.' : 'theme.colors.'
          const fixedText = `${p1}${rawCode}`
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
  name: 'no-classic-palette-directly',
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist identify code that directly uses `palette.<color>` to access theme variables without using `theme.colors` as prefix.",
    },
    fixable: 'code',
    schema: [],
    messages: {
      message: "Unexpected usage of variables from colors(assigned from `theme.colors.palette`) of classic theme directly.",
    },
  },
  defaultOptions: []
})

export default rule