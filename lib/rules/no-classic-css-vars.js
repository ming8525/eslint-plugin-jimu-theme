"use strict";
const { getColorNameInNewTheme: getNormalizedColroName } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect and fix classic theme css vars",
      category: "Best Practices",
      recommended: true
    },
    fixable: "code",
    messages: {
      message: 'Unexpected usage of css vars of classic theme.'
    },
    schema: []
  },
  create: function (context) {
    return {
      TemplateLiteral(node) {
        const sourceCode = context.getSourceCode();

        node.quasis.forEach(quasi => {
          const text = quasi.value.raw;
          const regex = /var\(--\b(primary|secondary|danger|warning|info|success)\)/g;
          let match;
          while ((match = regex.exec(text)) !== null) {
            const colorName = getNormalizedColroName(match[1])
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
                return fixer.replaceTextRange([start, end], `var(--sys-color-${colorName})`);
              },
            });
          }
        });
      }
    };
  },
};