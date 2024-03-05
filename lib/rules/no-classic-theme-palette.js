/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colors` to the new version.
 * @author ming8525
 */
"use strict";
const { isSpecifiedMemberExpressionNode, getNormalizedColorName, getNormalizedColorShade, ThemeCommonColors, ThemePaletteShades } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colors.palette` to the new version.",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'palette', ThemeCommonColors, ThemePaletteShades])) {
          const shade = getNormalizedColorShade(node.property.raw)
          const colorName = getNormalizedColorName(node.object.property.name)
          context.report({
            node: node,
            message: "Unexpected usage of theme palette of classic theme",
            fix: function (fixer) {
              const fixedText = `theme.sys.color.${colorName}.${shade}`
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
};
