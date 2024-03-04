/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colors` to the new version.
 * @author ming8525
 */
"use strict";
const { isThemeColorsVariables, getNormalizedColroName } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colros` to the new version.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isThemeColorsVariables(node)) {
          const colorName = getNormalizedColroName(node.parent.property.name)
          context.report({
            node: node.parent,
            message: "Unexpected usage of theme colors of classic theme",
            fix: function (fixer) {
              return fixer.replaceText(node.parent, `theme.sys.color.${colorName}.main`)
            }
          })
        }
      }
    }
  }
};
