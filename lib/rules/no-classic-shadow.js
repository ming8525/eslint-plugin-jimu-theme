'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages } = require('../utils')

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
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'boxShadows', ['none', 'sm', 'default', 'lg']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
