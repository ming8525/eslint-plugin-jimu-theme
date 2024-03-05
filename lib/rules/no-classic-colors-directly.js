/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colors` to the new version.
 * @author ming8525
 */
"use strict";
const { isSpecifiedMemberExpressionNode, getNormalizedColorName: getNormalizedColroName, ThemeCommonColors } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colors` to the new version.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['colors', ThemeCommonColors])) {
          const colorName = getNormalizedColroName(node.property.name)
          context.report({
            node: node,
            message: "Unexpected usage of variables from colors(assigned from `theme.colors`) of classic theme",
            fix: function (fixer) {
              return fixer.replaceText(node, `theme.sys.color.${colorName}.main`)
            }
          })
        }
      }
    }
  }
};
