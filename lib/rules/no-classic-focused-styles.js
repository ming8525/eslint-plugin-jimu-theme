'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal } = require('../utils')

const VariableMap = {
  offset: '2px',
  color: 'theme.sys.color.action.focus',
  colorOptional: 'theme?.sys.color.action.focus',
  width: '2px'
}

function reportMessages(node, context, sourceCode) {
  const varName = node.property.name

  let fixedText = ''
  if (varName === 'color') {
    const otional1 = isSpecifiedObjectOptinal(node, 'theme')
    const otional2 = isSpecifiedObjectOptinal(node, 'focusedStyles')
    fixedText = (otional1 || otional2) ? VariableMap.colorOptional : VariableMap.color
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
      description: 'This rule facilitates the deprecation of `focusedStyles` variables in the classic theme and provides automatic fixes to replace these `focusedStyles` variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-focused-styles.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme `focusedStyles` variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const sourceCode = context.sourceCode
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'focusedStyles', ['offset', 'color', 'width']])) {
          reportMessages(node, context, sourceCode)
        }
      }
    }
  }
}
