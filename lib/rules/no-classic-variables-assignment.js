'use strict'
const { DocURL, isSpecifiedScopeMemberExpressionNode, getMemberExpressionFromChainExpression } = require('../utils')

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
        if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'colors'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'colors', 'palette'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'borderRadiuses'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'border'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', ['header', 'body', 'footer', 'link']], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'focusedStyles'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'boxShadows'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'sizes'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'typography'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'typography', ['variants', 'sizes', 'colors', 'weights', 'lineHeights']], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'surfaces'], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        } else if ((isSpecifiedScopeMemberExpressionNode(mnode, ['theme', 'surfaces', ['1', '2']], { prefixProps: ['props'] }).match)) {
          reportMessages(node, context)
        }
      }
    }
  },
}