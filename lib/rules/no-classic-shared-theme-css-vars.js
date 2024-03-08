"use strict";
const { getSharedColorCSSVariableMappingInNewTheme } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect and fix classic shared theme css vars.",
      category: "Best Practices",
      recommended: true
    },
    fixable: "code",
    messages: {
      message: 'Unexpected usage of css vars of classic shared theme.'
    },
    schema: []
  },
  create: function (context) {
    return {
      TemplateLiteral(node) {
        const sourceCode = context.sourceCode

        node.quasis.forEach(quasi => {
          const text = quasi.value.raw;
          const regex = /var\(--\borg-\b(body|header|button)-\b(color|bg|link)\)/g;
          let match;
          while ((match = regex.exec(text)) !== null) {
            const colorName = match[1]
            const colorShade = match[2]
            if(!colorName || !colorShade) return
            const fixedText = getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
            const start = quasi.range[0] + match.index + 1;
            const end = start + match[0].length;
            context.report({
              node: quasi,
              loc: {
                start: sourceCode.getLocFromIndex(start),
                end: sourceCode.getLocFromIndex(end),
              },
              messageId: "message",
              fix: function (fixer) {
                return fixer.replaceTextRange([start, end], fixedText);
              },
            });
          }
        });
      }
    };
  },
};
