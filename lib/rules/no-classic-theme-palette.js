/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colors` to the new version.
 * @author ming8525
 */
"use strict";
const { isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, getColorVariableMappingInNewTheme, ThemeAllColors, ThemePaletteShades } = require('./utils')

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
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'colors', 'palette', ThemeAllColors, ThemePaletteShades])) {
          const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'colors', 'palette'])
          const fixedText = getColorVariableMappingInNewTheme(node.object.property.name, node.property.raw, otional)
          context.report({
            node: node,
            message: "Unexpected usage of theme palette of classic theme",
            fix: function (fixer) {
              return fixer.replaceText(node, fixedText)
            }
          })
        }
      }
    }
  }
};
