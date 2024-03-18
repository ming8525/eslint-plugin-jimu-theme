'use strict'
const { DocURL, isSpecifiedMemberExpressionNodeWithPrefixProps, getMemberExpressionFromChainExpression } = require('../utils')

function reportMessages(node, context) {
  if (node.init) {
    context.report({
      node,
      messageId: 'message',
    })
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow directly access theme variables in variable assignment. Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios.',
      recommended: false,
      url: `${DocURL}no-classic-variables-assignment.md`,
    },
    messages: {
      message: 'Do not directly access theme variables in variable assignment.',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        const mnode = getMemberExpressionFromChainExpression(node.init)
        if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'colors'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'colors', 'palette'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'borderRadiuses'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'border'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', ['header', 'body', 'footer', 'link']], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'focusedStyles'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'boxShadows'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'sizes'], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'typography'], ['props']).match)) {
          reportMessages(node, context)
        }  else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'typography', ['variants', 'sizes', 'colors', 'weights', 'lineHeights']], ['props']).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'surfaces'], ['props']).match)) {
          reportMessages(node, context)
        }  else if ((isSpecifiedMemberExpressionNodeWithPrefixProps(mnode, ['theme', 'surfaces', ['1', '2']], ['props']).match)) {
          reportMessages(node, context)
        }
      }
    }
  },
}