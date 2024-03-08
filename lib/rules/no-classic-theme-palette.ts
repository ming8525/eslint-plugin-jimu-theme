import { getColorVariableMappingInNewTheme, getMemberExpressionNodeOptinalObject, isSpecifiedMemberExpressionNode, ThemeAllColors, ThemePaletteShades } from './utils'
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule = createRule({
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'palette', ThemeAllColors, ThemePaletteShades])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.object.property.name, node.property.raw, otional)
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
  name: 'no-classic-theme-palette',
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colors.palette` to the new version."
    },
    fixable: 'code',
    messages: {
      message: "Unexpected usage of theme palette of classic theme",
    },
    schema: [],
  },
  defaultOptions: []
})

export default rule
