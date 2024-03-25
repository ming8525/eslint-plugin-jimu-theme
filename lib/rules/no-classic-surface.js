'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages } = require('../utils')

function reportMessagesForUsingObject(node, context, props) {
  const level = props[2].identifier
  const isSpreadElementArgument = node.parent && node.parent.type === 'SpreadElement'
  const newVar = `{
    bg: theme.sys.color.surface.${level === '1' ? 'paper' : 'overlay'},
    border: {
      color: theme.sys.color.divider.secondary,
      width: '1px'
    },
    shadow: ${level === '1' ? '\'none\'' : 'theme.sys.shadow.shadow2'}
  }`
  const fixedText = isSpreadElementArgument ? `(${newVar})` : newVar
  const rawCode = context.sourceCode.getText(node)
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
      description: 'This rule facilitates the deprecation of surfaces variables in the classic theme and provides automatic fixes to replace these border variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-surface.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme surfaces variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'surfaces', ['1', '2'], ['bg', 'shadow']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'surfaces', ['1', '2'], 'border', ['color', 'width', 'type']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'surfaces', ['1', '2']], variables))) {
          reportMessagesForUsingObject(node, context, props)
        }
      }
    }
  }
}
