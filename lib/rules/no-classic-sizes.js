'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal } = require('../utils')

function reportMessages(node, context, sourceCode, type) {
  const level = node.property.raw
  const otional1 = isSpecifiedObjectOptinal(node, 'theme')
  const otional2 = isSpecifiedObjectOptinal(node, 'sizes')
  const prefix = (otional1 || otional2) ? 'theme?.' : 'theme.'
  const fixedText = type === 'function' ? `${prefix}sys.spacing(${level})` : `${prefix}sys.spacing[${level}]`
  const rawCode = sourceCode.getText(node)
  context.report({
    node: node,
    messageId: 'message',
    data: {
      oldVar: rawCode,
      newVar: fixedText
    },
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  })
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of sizes variables in the classic theme and provides automatic fixes to replace these sizes variables with variables from the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-sizes.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme sizes variables and replace them with variables from the new theme. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [
      {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['function', 'property'],
            default: 'function',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {}
    const type = options.type || 'function'
    return {
      MemberExpression(node) {
        const sourceCode = context.sourceCode
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'sizes', ['0', '1', '2', '3', '4', '5', '6']])) {
          reportMessages(node, context, sourceCode, type)
        }
      }
    }
  }
}
