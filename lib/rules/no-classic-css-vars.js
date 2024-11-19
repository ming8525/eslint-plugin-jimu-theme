'use strict'
const {
  DocURL,
  getColorCSSVariableMappingInNewTheme,
  getSharedColorCSSVariableMappingInNewTheme,
} = require('../utils')

const regex1 = /var\(--\b(primary|secondary|danger|warning|info|success|light|dark)-\b(100|200|300|400|500|600|700|800|900)\)/g
const regex2 = /var\(--\b(primary|secondary|danger|warning|info|success|white|black|light|dark|transparent)\)/g
const regex3 = /var\(--\borg-\b(body|header|button)-\b(color|bg|link)\)/g

function getLiteralReports(node, match, isSharedColor) {
  const oldVar = match[0]
  const colorName = match[1]
  const colorShade = match[2]
  if (!colorName && !colorShade) return
  const newVar = isSharedColor
    ? getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
    : getColorCSSVariableMappingInNewTheme(colorName, colorShade)
  const quote = node.raw.startsWith('"') ? '"' : "'"
  const fixedText = `${quote}${node.value.replace(oldVar, newVar)}${quote}`
  return {
    node,
    messageId: 'message',
    data: { oldVar, newVar },
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    },
  }
}

function getTemplateLiteralReports(node, match, sourceCode, isSharedColor) {
  const oldVar = match[0]
  const colorName = match[1]
  const colorShade = match[2]
  if (!colorName && !colorShade) return
  const newVar = isSharedColor
    ? getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
    : getColorCSSVariableMappingInNewTheme(colorName, colorShade)
  const start = node.range[0] + match.index + 1
  const end = start + match[0].length
  return {
    node: node,
    loc: {
      start: sourceCode.getLocFromIndex(start),
      end: sourceCode.getLocFromIndex(end),
    },
    messageId: 'message',
    data: { oldVar, newVar },
    fix: function (fixer) {
      return fixer.replaceTextRange([start, end], newVar)
    },
  }
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
        if (
          node.parent &&
          node.parent.type === 'VariableDeclarator' &&
          node.parent.init === node
        ) {
          const text = node.value
          let match
          while ((match = regex1.exec(text)) !== null) {
            context.report(getLiteralReports(node, match, false))
          }
          while ((match = regex2.exec(text)) !== null) {
            context.report(getLiteralReports(node, match, false))
          }
          while ((match = regex3.exec(text)) !== null) {
            context.report(getLiteralReports(node, match, true))
          }
        }
      },
      TemplateLiteral(node) {
        const sourceCode = context.sourceCode
        node.quasis.forEach((quasi) => {
          const text = quasi.value.raw
          let match
          while ((match = regex1.exec(text)) !== null) {
            context.report(getTemplateLiteralReports(node, match, sourceCode, false))
          }
          while ((match = regex2.exec(text)) !== null) {
            context.report(getTemplateLiteralReports(node, match, sourceCode, false))
          }
          while ((match = regex3.exec(text)) !== null) {
            context.report(getTemplateLiteralReports(node, match, sourceCode, true))
          }
        })
      },
      JSXAttribute(node) {
        if (
          node.name.name === 'style' &&
          node.value &&
          node.value.expression &&
          node.value.expression.type === 'ObjectExpression'
        ) {
          node.value.expression.properties.forEach((property) => {
            if (property.value && property.value.type === 'Literal') {
              const text = property.value.value
              let match
              while ((match = regex1.exec(text)) !== null) {
                context.report(getLiteralReports(property.value, match, false))
              }
              while ((match = regex2.exec(text)) !== null) {
                context.report(getLiteralReports(property.value, match, false))
              }
              while ((match = regex3.exec(text)) !== null) {
                context.report(getLiteralReports(property.value, match, true))
              }
            }
          })
        }
      },
    }
  },
}
