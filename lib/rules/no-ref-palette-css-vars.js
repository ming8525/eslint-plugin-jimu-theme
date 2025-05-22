'use strict'
const { DocURL } = require('../utils')

const regex1 = /var\(--\bref-\bpalette-\b(primary|secondary|neutral|error|warning|info|success)-\b(100|200|300|400|500|600|700|800|900|1000|1100|1200|1300)\)/g
const regex2 = /var\(--\bref-\bpalette-\b(black|white)\)/g

function reportLiteral(context, node, match, isTemplateLiteral) {
  const colorName = match[1]
  const colorShade = match[2]
  if (!colorName && !colorShade) return

  const reports = {
    node: node,
    messageId: 'message'
  }
  if (isTemplateLiteral) {
    const start = node.range[0] + match.index + 1
    const end = start + match[0].length
    reports.loc = {
      start: context.sourceCode.getLocFromIndex(start),
      end: context.sourceCode.getLocFromIndex(end),
    }
  }
  context.report(reports)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule is used to check whether a theme ref palette css vars is being used.',
      recommended: false,
      url: `${DocURL}no-ref-palette-css-vars.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Theme `--ref-palette` css vars should not be used, please use the `--sys-color` css vars instead.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowBlackAndWhite: {
            type: 'boolean',
            default: true,
            description: 'Whether to allow black and white of palette to be used. Default is true.',
          }
        },
        additionalProperties: false,
      },
    ],
  },
  create: function (context) {
    const option = context.options[0] || {}
    const allowBlackAndWhite = option.allowBlackAndWhite ?? true

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const text = node.value
          let match
          while ((match = regex1.exec(text)) !== null) {
            reportLiteral(context, node, match, false)
          }
          while ((match = regex2.exec(text)) !== null) {
            if (!allowBlackAndWhite) {
              reportLiteral(context, node, match, false)
            }
          }
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          if (quasi.value && typeof quasi.value.raw === 'string') {
            const text = quasi.value.raw
            let match
            while ((match = regex1.exec(text)) !== null) {
              reportLiteral(context, node, match, true)
            }
            while ((match = regex2.exec(text)) !== null) {
              if (!allowBlackAndWhite) {
                reportLiteral(context, node, match, true)
              }
            }
          }
        })
      }
    }
  },
}
