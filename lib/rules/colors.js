/**
 * @fileoverview This rule is used to assist in migrating color variables in `theme.colros` to the new version.
 * @author ming8525
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "This rule is used to assist in migrating color variables in `theme.colros` to the new version.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object && node.property && node.object.type === 'Identifier' &&
          node.object.name === 'theme' && node.property.type === 'Identifier' &&
          node.property.name === 'colors' && node.parent && node.parent.property &&
          node.parent.property.type === 'Identifier' && node.parent.property.name === 'primary') {
          context.report({
            node: node.parent,
            message: "Avoid using theme.colors.primary, use new variable instead."
          })

          context.report({
            node,
            message: "Avoid using theme.colors.primary, use new variable instead.",
            fix: function (fixer) {
              return fixer.replaceText(node.parent, 'theme.sys.color.primary.main')
            }
          })
        }
      }
    }
  }
};
