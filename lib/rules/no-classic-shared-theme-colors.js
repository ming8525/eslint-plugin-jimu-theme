'use strict'
const { isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, getSharedColorVariableMappingInNewTheme } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule is used to assist in migrating color variables in `theme.colors.orgSharedColors` to the new version.',
      recommended: false,
      url: null,
    },
    fixable: 'code',
    messages: {
      message: 'Unexpected usage of variables from orgSharedColors(assigned from `theme.colors.orgSharedColors`) of classic theme.',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'orgSharedColors', ['header', 'body', 'button'], ['color', 'bg', 'link']])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'orgSharedColors'])
          const fixedText = getSharedColorVariableMappingInNewTheme(node.object.property.name, node.property.name, otional)
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
  }
}
