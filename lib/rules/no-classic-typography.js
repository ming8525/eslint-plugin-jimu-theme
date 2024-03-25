'use strict'
const { DocURL, matchNodeIdentifiers, reportMessages, TypographyVariantsMap, TypographyStylesMap, TypographyColorsMap, TypographyWeightsMap, TypographyLineHeightsMap } = require('../utils')
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of typography variables in the classic theme and provides automatic fixes to replace these typography variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-colors.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme typography variables and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'variants', Object.keys(TypographyVariantsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'sizes', Object.keys(TypographyVariantsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'colors', Object.keys(TypographyColorsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'weights', Object.keys(TypographyWeightsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)], variables))) {
          reportMessages(node, context, props)
        } else if ((props = matchNodeIdentifiers(node, ['this', 'props', ['theme', 'theme2'], 'typography', ['fontFamilyBase', 'fontSizeRoot', 'fontSizeBase']], variables))) {
          reportMessages(node, context, props)
        }
      }
    }
  }
}
