'use strict'
const { DocURL, FontStyles, matchNodeIdentifiers, reportMessages } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of elements(e.g header, footer, body, link) variables in the classic theme and provides automatic fixes to replace these elements variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-elements.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme elements(e.g header, footer, body, link) variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'header', ['color', 'bg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'footer', ['color', 'bg']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'body', ['color', 'bg', ...FontStyles]], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'link', ['color', 'decoration']], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'link', 'hover', ['color', 'decoration']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
