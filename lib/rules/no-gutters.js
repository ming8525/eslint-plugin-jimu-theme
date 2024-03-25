'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of gutter variables in the theme and provides automatic fixes to replace these gutter variables with specific values.',
      recommended: false,
      url: `${DocURL}no-gutters.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate gutter variables in the theme and replace them with specific values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'gutters', ['0', '1', '2', '3', '4', '5']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
