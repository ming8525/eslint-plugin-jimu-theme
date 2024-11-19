'use strict'
const {
  DocURL,
  getColorCSSVariableMappingInNewTheme,
  getSharedColorCSSVariableMappingInNewTheme,
} = require('../utils')

const regex1 = /var\(--\b(primary|secondary|danger|warning|info|success|light|dark)-\b(100|200|300|400|500|600|700|800|900)\)/g
const regex2 = /var\(--\b(primary|secondary|danger|warning|info|success|white|black|light|dark|transparent)\)/g
const regex3 = /var\(--\borg-\b(body|header|button)-\b(color|bg|link)\)/g

function reportLiteral(context, node, match, isTemplateLiteral, isSharedColor) {
  const oldVar = match[0]
  const colorName = match[1]
  const colorShade = match[2]
  if (!colorName && !colorShade) return
  const newVar = isSharedColor
    ? getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
    : getColorCSSVariableMappingInNewTheme(colorName, colorShade)

  const reports = {
    node: node,
    messageId: 'message',
    data: { oldVar, newVar },
  }
  if (isTemplateLiteral) {
    const start = node.range[0] + match.index + 1
    const end = start + match[0].length
    reports.loc = {
      start: context.sourceCode.getLocFromIndex(start),
      end: context.sourceCode.getLocFromIndex(end),
    }
    reports.fix = function (fixer) {
      return fixer.replaceTextRange([start, end], newVar)
    }
  } else {
    const quote = node.raw.startsWith('"') ? '"' : "'"
    const fixedText = `${quote}${node.value.replace(oldVar, newVar)}${quote}`
    reports.fix = function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  }
  context.report(reports)
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme.',
      recommended: false,
      url: `${DocURL}no-classic-css-vars.md`,
    },
    fixable: 'code',
    messages: {
      message:
        'Upgrade CSS variables representing colors from the classic theme ({{oldVar}}) to the new theme ({{newVar}}).',
    },
    schema: [],
  },
  create: function (context) {
    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          const text = node.value
          let match
          while ((match = regex1.exec(text)) !== null) {
            reportLiteral(context, node, match, false, false)
          }
          while ((match = regex2.exec(text)) !== null) {
            reportLiteral(context, node, match, false, false)
          }
          while ((match = regex3.exec(text)) !== null) {
            reportLiteral(context, node, match, false, true)
          }
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          if (quasi.value && typeof quasi.value.raw === 'string') {
            const text = quasi.value.raw
            let match
            while ((match = regex1.exec(text)) !== null) {
              reportLiteral(context, node, match, true, false)
            }
            while ((match = regex2.exec(text)) !== null) {
              reportLiteral(context, node, match, true, false)
            }
            while ((match = regex3.exec(text)) !== null) {
              reportLiteral(context, node, match, true, true)
            }
          }
        })
      },
      // ObjectExpression(node) {
      //   node.properties.forEach((property) => {
      //     if (property.value && property.value.type === 'Literal') {
      //       const text = property.value.value
      //       let match
      //       while ((match = regex1.exec(text)) !== null) {
      //         reportLiteral(context, property.value, match, false, false)
      //       }
      //       while ((match = regex2.exec(text)) !== null) {
      //         reportLiteral(context, property.value, match, false, false)
      //       }
      //       while ((match = regex3.exec(text)) !== null) {
      //         reportLiteral(context, property.value, match, false, true)
      //       }
      //     } else if (property.value && property.value.type === 'TemplateLiteral') {
      //       property.value.quasis.forEach((quasi) => {
      //         const text = quasi.value.raw
      //         let match
      //         while ((match = regex1.exec(text)) !== null) {
      //           reportLiteral(context, property.value, match, true, false)
      //         }
      //         while ((match = regex2.exec(text)) !== null) {
      //           reportLiteral(context, property.value, match, true, false)
      //         }
      //         while ((match = regex3.exec(text)) !== null) {
      //           reportLiteral(context, property.value, match, true, true)
      //         }
      //       })
      //     }
      //   })
      // },
      // JSXAttribute(node) {
      //   if (node.value) {
      //     if (node.value.type === 'Literal') {
      //       let match
      //       const text = node.value.value
      //       while ((match = regex1.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value, match, false))
      //       }
      //       while ((match = regex2.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value, match, false))
      //       }
      //       while ((match = regex3.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value, match, true))
      //       }
      //     }
      //   }
      //   if (node.value.type === 'JSXExpressionContainer' && node.value.expression) {
      //     if (node.value.expression.type === 'ObjectExpression') {
      //       node.value.expression.properties.forEach((property) => {
      //         if (property.value && property.value.type === 'Literal') {
      //           const text = property.value.value
      //           let match
      //           while ((match = regex1.exec(text)) !== null) {
      //             context.report(reportLiteral(property.value, match, false))
      //           }
      //           while ((match = regex2.exec(text)) !== null) {
      //             context.report(reportLiteral(property.value, match, false))
      //           }
      //           while ((match = regex3.exec(text)) !== null) {
      //             context.report(reportLiteral(property.value, match, true))
      //           }
      //         }
      //       })
      //     } else if (node.value.expression.type === 'Literal') {
      //       let match
      //       const text = node.value.expression.value
      //       while ((match = regex1.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value.expression, match, false))
      //       }
      //       while ((match = regex2.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value.expression, match, false))
      //       }
      //       while ((match = regex3.exec(text)) !== null) {
      //         context.report(reportLiteral(node.value.expression, match, true))
      //       }
      //     }
      //   }
      // }
    }
  },
}
