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
      description: "This rule is used to assist in migrating color variables in `theme.colros` to the new version.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', ThemeCommonColors])) {
          const colorName = getNormalizedColroName(node.property.name)
          context.report({
            node: node,
            message: "Unexpected usage of theme colors of classic theme",
            fix: function (fixer) {
              let fixedText = `theme.sys.color.${colorName}.main`
              if(colorName === 'white' || colorName === 'black') {
                fixedText = `theme.ref.palette.${colorName}`
              }
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
};
