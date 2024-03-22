'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of sizes variables in the classic theme and provides automatic fixes to replace these sizes variables with variables from the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-sizes.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme sizes variables and replace them with variables from the new theme. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', 'theme', 'sizes', ['0', '1', '2', '3', '4', '5', '6']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
