'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal } = require('../utils')

const VariableMap = {
  none: 'none',
  sm: '0px',
  default: 'theme.sys.shape.shape1',
  defaultOptional: 'theme?.sys.shape.shape1',
  lg: 'theme.sys.shape.shape2',
  lgOptional: 'theme?.sys.shape.shape2',
}

function reportMessages(node, context, sourceCode) {
  const varName = node.property.name

  let fixedText = ''
  if (varName === 'default' || varName === 'lg') {
    const otional1 = isSpecifiedObjectOptinal(node, 'theme')
    const otional2 = isSpecifiedObjectOptinal(node, 'borderRadiuses')
    fixedText = (otional1 || otional2) ? VariableMap[`${varName}Optional`] : VariableMap[varName]
  } else {
    fixedText = `'${VariableMap[varName]}'`
  }

  const rawCode = sourceCode.getText(node)
  context.report({
    node: node,
    messageId: 'message',
    data: {
      oldVar: rawCode,
      newVar: VariableMap[varName]
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
      description: 'This rule facilitates the deprecation of borderRadiuses variables in the classic theme and provides automatic fixes to replace these borderRadiuses variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-border-radius.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme `borderRadiuses` variables and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const sourceCode = context.sourceCode
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'borderRadiuses', ['none', 'sm', 'default', 'lg']])) {
          reportMessages(node, context, sourceCode)
        }
        if (isSpecifiedMemberExpressionNode(node, ['borderRadiuses', ['none', 'sm', 'default', 'lg']])) {
          reportMessages(node, context, sourceCode)
        }
      }
    }
  }
}
