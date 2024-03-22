'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages } = require('../utils')

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
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'focusedStyles',['offset', 'color', 'width']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
