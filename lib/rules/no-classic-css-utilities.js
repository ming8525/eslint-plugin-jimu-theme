'use strict'
const { getCSSUtilitiesMappingInNewTheme } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the upgrade of css utilities from the classic theme to the new theme.',
      recommended: false
    },
    fixable: 'code',
    messages: {
      replace: 'Upgrade css utilities from the classic theme \'{{oldUtility}}\' to the new theme \'{{newUtility}}\'.',
      deprecated: 'Deprecated css utilities for classic theme.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          removeDeprecated: {
            type: 'boolean',
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {}
    const removeDeprecated = options.removeDeprecated || true

    const regex1 = /\b(text|bg|border)-\b(light|dark)(?:-(100|200|300|400|500|600|700|800|900))(?=\s|$)/g
    const regex2 = /\b(text|bg|border)-\b(primary|secondary|danger|warning|info|success|white|black|transparent|light|dark)(?=\s|$)/g
    return {
      JSXAttribute(node) {
        const sourceCode = context.sourceCode

        if (node.name.name === 'className' && node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const text = node.value.value
          let match
          while ((match = regex1.exec(text)) !== null) {
            const oldUtility = match[0]
            const prefix = match[1]
            const colorName = match[2]
            const colorShade = match[3] || 'default'
            if (!prefix || !colorName) return
            const start = node.value.range[0] + match.index + 1
            const end = start + match[0].length
            const newUtility = getCSSUtilitiesMappingInNewTheme(prefix, colorName, colorShade)
            if (!newUtility) {
              let fix
              if (removeDeprecated) {
                fix = fixer => fixer.replaceTextRange([start - (match.index === 0 ? 0 : 1), end + (match.index === 0 ? (node.value.value.includes(' ') ? 1 : 0) : 0)], '')
              }
              context.report({
                node: node.value,
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(end),
                },
                messageId: 'deprecated',
                fix
              })
            } else {
              const fixedText = `'${text.replace(oldUtility, newUtility)}'`
              context.report({
                node: node.value,
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(end),
                },
                messageId: 'replace',
                data: {
                  oldUtility,
                  newUtility
                },
                fix: fixer => fixer.replaceText(node.value, fixedText),
              })
            }
          }
          while ((match = regex2.exec(text)) !== null) {
            const oldUtility = match[0]
            const prefix = match[1]
            const colorName = match[2]
            if (!prefix || !colorName) return
            const start = node.value.range[0] + match.index + 1
            const end = start + match[0].length
            const newUtility = getCSSUtilitiesMappingInNewTheme(prefix, colorName, 'default')
            if (!newUtility) {
              let fix
              if (removeDeprecated) {
                fix = fixer => fixer.replaceTextRange([start - (match.index === 0 ? 0 : 1), end + (match.index === 0 ? (node.value.value.includes(' ') ? 1 : 0) : 0)], '')
              }
              context.report({
                node: node.value,
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(end),
                },
                messageId: 'deprecated',
                fix
              })
            } else {
              const fixedText = `'${text.replace(oldUtility, newUtility)}'`
              context.report({
                node: node.value,
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(end),
                },
                messageId: 'replace',
                data: {
                  oldUtility,
                  newUtility
                },
                fix: fixer => fixer.replaceText(node.value, fixedText),
              })
            }
          }
        }
      }
    }
  }
}
