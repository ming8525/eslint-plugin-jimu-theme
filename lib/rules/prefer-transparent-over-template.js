'use strict'

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Convert `${\'transparent\'}` to `transparent`',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'code',
    messages: {
      message: 'Prefer \'transparent\' over `${\'transparent\'}`'
    },
    schema: []
  },
  create: function (context) {
    const sourceCode = context.sourceCode
    return {
      TemplateLiteral(node) {
        node.expressions.forEach(expression => {
          if (expression.type === 'Literal' && expression.raw === '\'transparent\'') {
            const start = expression.range[0] - 2
            const end = expression.range[1] + 1
            context.report({
              node: expression,
              loc: {
                start: sourceCode.getLocFromIndex(start),
                end: sourceCode.getLocFromIndex(end)
              },
              messageId: 'message',
              fix: function(fixer) {
                return fixer.replaceTextRange([start, end], 'transparent')
              }
            })
          }
        })
      }
    }
  }
}
