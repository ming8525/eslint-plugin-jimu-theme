'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal } = require('../utils')

function reportMessages(node, context, sourceCode) {
  const otional = isSpecifiedObjectOptinal(node, 'theme')
  const fixedText = otional ? 'theme?.sys.color.mode === \'dark\'' : 'theme.sys.color.mode === \'dark\''


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
      description: 'This rule facilitates the deprecation of `darkTheme` variables in the classic theme and provides automatic fixes to replace it with variables from the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-dark-theme.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme `darkTheme` variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const sourceCode = context.sourceCode
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'darkTheme'])) {
          reportMessages(node, context, sourceCode)
        }
      }
    }
  }
}
