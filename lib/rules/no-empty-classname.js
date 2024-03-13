'use strict'

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Remove empty className attributes from React components',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      message: 'Empty className attribute should be removed.'
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (
          node.name.name === 'className' &&
          node.value &&
          node.value.type === 'Literal' &&
          node.value.value.trim() === ''
        ) {
          context.report({
            node,
            messageId: 'message',
            fix(fixer) {
              return fixer.removeRange([node.range[0] - 1, node.range[1]])
            },
          })
        }
      },
    }
  },
}