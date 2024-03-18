'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject } = require('../utils')

const VariableMap = {
  1: {
    bg: {
      scope: 'sys.color.surface',
      property: 'paper'
    },
    shadow: {
      scope: '',
      property: 'none'
    },
    'border.color': {
      scope: 'sys.color.divider',
      property: 'secondary'
    },
    'border.type': {
      scope: '',
      property: 'solid'
    },
    'border.width': {
      scope: '',
      property: '1px'
    },
  },
  2: {
    bg: {
      scope: 'sys.color.surface',
      property: 'overlay'
    },
    shadow: {
      scope: 'sys.shadow',
      property: 'shadow2'
    },
    'border.color': {
      scope: 'sys.color.divider',
      property: 'secondary'
    },
    'border.type': {
      scope: '',
      property: 'solid'
    },
    'border.width': {
      scope: '',
      property: '1px'
    },
  }
}

function getVariableMappingInNewTheme(part1, part2, part3, optional) {
  let mapping = ''
  let var2 = part2
  if(part3) {
    var2 = `${part2}.${part3}`
  }
  const { scope, property } = VariableMap[part1][var2]

  if (!scope) {
    mapping = `'${property}'`
  } else {
    const k1 = 'theme'
    const k2 = scope
    const p1 = `${k1}${optional.theme ? '?' : ''}.`
    const p2 = `${k2}${optional.surfaces ? '?' : ''}.`
    const p3 = property
    mapping = `${p1}${p2}${p3}`
  }
  return mapping
}

function reportMessages(node, context, fourLevel = false) {
  const part1 = fourLevel ? node.object.object.property.raw : node.object.property.raw
  const part2 = fourLevel ? node.object.property.name : node.property.name
  const part3 = fourLevel ? node.property.name : null
  
  const otional = getMemberExpressionNodeOptinalObject(node, ['theme', 'surfaces'])
  let fixedText = getVariableMappingInNewTheme(part1, part2, part3, otional)
  const rawCode = context.sourceCode.getText(node)
  context.report({
    node: node,
    messageId: 'message',
    data: {
      oldVar: rawCode,
      newVar: fixedText
    },
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  })
}


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of surfaces variables in the classic theme and provides automatic fixes to replace these border variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-surface.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme surfaces variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'surfaces', ['1', '2'], ['bg', 'shadow']])) {
          reportMessages(node, context)
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'surfaces', ['1', '2'], 'border', ['color', 'width', 'type']])) {
          reportMessages(node, context, true)
        }
      }
    }
  }
}
