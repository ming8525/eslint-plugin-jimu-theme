'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal } = require('../utils')

const VariableMap = {
  none: 'none',
  sm: 'theme.sys.shadow.shadow1',
  smOptional: 'theme?.sys.shadow.shadow1',
  default: 'theme.sys.shadow.shadow2',
  defaultOptional: 'theme?.sys.shadow.shadow2',
  lg: 'theme.sys.shadow.shadow3',
  lgOptional: 'theme?.sys.shadow.shadow3',
}

function reportMessages(node, context, sourceCode) {
  const varName = node.property.name

  let fixedText = ''
  if (varName !== 'none') {
    const otional1 = isSpecifiedObjectOptinal(node, 'theme')
    const otional2 = isSpecifiedObjectOptinal(node, 'boxShadows')
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
      description: 'This rule facilitates the deprecation of `boxShadows` variables in the classic theme and provides automatic fixes to replace these boxShadows variables with variables from the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-shadow.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme `boxShadows` variables and replace them with variables from the new theme. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const sourceCode = context.sourceCode
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'boxShadows', ['none', 'sm', 'default', 'lg']])) {
          reportMessages(node, context, sourceCode)
        }
      }
    }
  }
}
