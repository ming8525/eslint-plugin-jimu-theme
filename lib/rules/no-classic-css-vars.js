'use strict'
const { getColorCSSVariableMappingInNewTheme, getSharedColorCSSVariableMappingInNewTheme } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme.',
      recommended: false
    },
    fixable: 'code',
    messages: {
      message: 'Upgrade CSS variables representing colors from the classic theme ({{oldVar}}) to the new theme ({{newVar}}).'
    },
    schema: []
  },
  create: function (context) {
    const regex1 = /var\(--\b(primary|secondary|danger|warning|info|success|light|dark)-\b(100|200|300|400|500|600|700|800|900)\)/g
    const regex2 = /var\(--\b(primary|secondary|danger|warning|info|success|white|black|light|dark|transparent)\)/g
    const regex3 = /var\(--\borg-\b(body|header|button)-\b(color|bg|link)\)/g
    return {
      TemplateLiteral(node) {
        const sourceCode = context.sourceCode

        node.quasis.forEach(quasi => {
          const text = quasi.value.raw
          let match
          if ((match = regex1.exec(text)) !== null) {
            const oldVar = match[0]
            const colorName = match[1]
            const colorShade = match[2]
            if (!colorName || !colorShade) return
            const fixedText = getColorCSSVariableMappingInNewTheme(colorName, colorShade)
            const start = quasi.range[0] + match.index + 1
            const end = start + match[0].length
            context.report({
              node: quasi,
              loc: {
                start: sourceCode.getLocFromIndex(start),
                end: sourceCode.getLocFromIndex(end),
              },
              messageId: 'message',
              data: {
                oldVar,
                newVar: fixedText
              },
              fix: function (fixer) {
                return fixer.replaceTextRange([start, end], fixedText)
              },
            })
          } else if ((match = regex2.exec(text)) !== null) {
            const oldVar = match[0]
            const colorName = match[1]
            if (!colorName) return
            const fixedText = getColorCSSVariableMappingInNewTheme(colorName)
            const start = quasi.range[0] + match.index + 1
            const end = start + match[0].length
            context.report({
              node: quasi,
              loc: {
                start: sourceCode.getLocFromIndex(start),
                end: sourceCode.getLocFromIndex(end),
              },
              messageId: 'message',
              data: {
                oldVar,
                newVar: fixedText
              },
              fix: function (fixer) {
                return fixer.replaceTextRange([start, end], fixedText)
              },
            })
          } else if ((match = regex3.exec(text)) !== null) {
            const oldVar = match[0]
            const colorName = match[1]
            const colorShade = match[2]
            if(!colorName || !colorShade) return
            const fixedText = getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
            const start = quasi.range[0] + match.index + 1
            const end = start + match[0].length
            context.report({
              node: quasi,
              loc: {
                start: sourceCode.getLocFromIndex(start),
                end: sourceCode.getLocFromIndex(end),
              },
              messageId: 'message',
              data: {
                oldVar,
                newVar: fixedText
              },
              fix: function (fixer) {
                return fixer.replaceTextRange([start, end], fixedText)
              },
            })
          }
        })
      }
    }
  },
}