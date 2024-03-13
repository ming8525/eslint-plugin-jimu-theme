'use strict'
const { getCSSUtilitiesMappingInNewTheme } = require('../utils')


function reportMessages(node, match, removeDeprecated, context) {
  const text = node.value.value
  const oldUtility = match[0]
  const start = node.value.range[0] + match.index + 1
  const end = start + match[0].length
  const newUtility = getCSSUtilitiesMappingInNewTheme(oldUtility)
  if (!newUtility) {
    let fix
    if (removeDeprecated) {
      fix = fixer => fixer.replaceTextRange([start - (match.index === 0 ? 0 : 1), end + (match.index === 0 ? (node.value.value.includes(' ') ? 1 : 0) : 0)], '')
    }
    context.report({
      node: node.value,
      loc: {
        start: context.sourceCode.getLocFromIndex(start),
        end: context.sourceCode.getLocFromIndex(end),
      },
      messageId: 'deprecated',
      fix
    })
  } else {
    const fixedText = `'${text.replace(oldUtility, newUtility)}'`
    context.report({
      node: node.value,
      loc: {
        start: context.sourceCode.getLocFromIndex(start),
        end: context.sourceCode.getLocFromIndex(end),
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
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {}
    const removeDeprecated = options.removeDeprecated || false

    const regex1 = /\b(text|bg|border)-(light|dark)(?:-(100|200|300|400|500|600|700|800|900))(?=\s|$)/g
    const regex2 = /\b(text|bg|border)-(primary|secondary|danger|warning|info|success|white|black|transparent|light|dark)(?=\s|$)/g
    const regex3 = /\brounded(?:-(none|sm|lg|circle|pill))?(?=\s|$)/g
    const regex4 = /\bshadow-(none|sm|lg)(?=\s|$)/g
    const regex5 = /\bsetting-text-level-(0|1|2|3)(?=\s|$)/g
    const regex6 = /\bfont-(h1|h2|h3|h4|h5|h6|body1|body2|caption1|caption2)(?=\s|$)/g
    const regex7 = /\btext-(title|normal|caption|muted)(?=\s|$)/g
    return {
      JSXAttribute(node) {
        if (node.name.name === 'className' && node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const text = node.value.value
          let match
          while ((match = regex1.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex2.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex3.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex4.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex5.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex6.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
          while ((match = regex7.exec(text)) !== null) {
            reportMessages(node, match, removeDeprecated, context)
          }
        }
      }
    }
  }
}
