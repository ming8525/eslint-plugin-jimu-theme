'use strict'
const { getColorCSSVariableMappingInNewTheme, getSharedColorCSSVariableMappingInNewTheme } = require('./utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme in style.',
      recommended: false
    },
    fixable: 'code',
    messages: {
      message: 'Upgrade CSS variables representing colors from the classic theme ({{oldVar}}) to the new theme ({{newVar}}).'
    },
    schema: []
  },
  create(context) {
    const regex1 = /var\(--\b(primary|secondary|danger|warning|info|success|light|dark)-\b(100|200|300|400|500|600|700|800|900)\)/g
    const regex2 = /var\(--\b(primary|secondary|danger|warning|info|success|white|black|light|dark|transparent)\)/g
    const regex3 = /var\(--\borg-\b(body|header|button)-\b(color|bg|link)\)/g
    return {
      JSXAttribute(node) {
        if (
          node.name.name === 'style' &&
          node.value &&
          node.value.expression &&
          node.value.expression.type === 'ObjectExpression'
        ) {
          node.value.expression.properties.forEach(property => {
            if (property.value.type === 'Literal') {
              const text = property.value.value
              let match
              if ((match = regex1.exec(text)) !== null) {
                const oldVar = match[0]
                const colorName = match[1]
                const colorShade = match[2]
                if (!colorName || !colorShade) return
                const newVar = getColorCSSVariableMappingInNewTheme(colorName, colorShade)
                const fixedText = `'${text.replace(oldVar, newVar)}'`
                context.report({
                  node: property.value,
                  messageId: 'message',
                  data: {
                    oldVar,
                    newVar
                  },
                  fix: fixer => fixer.replaceText(property.value, fixedText),
                })
              } else if ((match = regex2.exec(text)) !== null) {
                const oldVar = match[0]
                const colorName = match[1]
                if (!colorName) return
                const newVar = getColorCSSVariableMappingInNewTheme(colorName)
                const fixedText = `'${text.replace(oldVar, newVar)}'`
                context.report({
                  node: property.value,
                  messageId: 'message',
                  data: {
                    oldVar,
                    newVar
                  },
                  fix: fixer => fixer.replaceText(property.value, fixedText),
                })
              } else if ((match = regex3.exec(text)) !== null) {
                const oldVar = match[0]
                const colorName = match[1]
                const colorShade = match[2]
                if (!colorName || !colorShade) return
                const newVar = getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade)
                const fixedText = `'${text.replace(oldVar, newVar)}'`
                context.report({
                  node: property.value,
                  messageId: 'message',
                  data: {
                    oldVar,
                    newVar
                  },
                  fix: fixer => fixer.replaceText(property.value, fixedText),
                })

              }
            }
          })
        }
      },
    }
  },
}
