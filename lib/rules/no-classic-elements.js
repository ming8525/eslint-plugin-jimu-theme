'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject, uppercaseFirstLetter } = require('../utils')

const fontStyles = ['fontFamily', 'fontWeight', 'fontSize', 'fontStyle', 'lineHeight']

function getNameAndScopeInNewTheme(part1, part2, part3) {
  let scope = `comp.${uppercaseFirstLetter(part1)}.root.vars`
  let property = part2
  if (part1 === 'body') {
    if (fontStyles.includes(part2)) {
      if (part2 === 'fontStyle') {
        scope = ''
        property = 'unset'
      } else {
        scope = 'sys.typography.body2'
        property = part2
      }
    } else if(part2 === 'color' || part2 === 'bg') {
      scope = 'sys.color.surface'
      property = part2 === 'color' ? 'backgroundText' : 'background'
    }
  } else if (part1 === 'link') {
    if (part2 === 'hover' && part3) {
      if (part3 === 'decoration') {
        scope = ''
        property = 'underline'
      } else {
        scope = 'sys.color.action.link'
        property = 'hover'
      }
    } else {
      if (part2 === 'decoration') {
        scope = ''
        property = 'none'
      } else {
        scope = 'sys.color.action.link'
        property = 'default'
      }
    }
  }
  return { scope, property }
}


function getVariableMappingInNewTheme(part1, part2, part3, optional) {
  let mapping = ''
  const { scope, property } = getNameAndScopeInNewTheme(part1, part2, part3)

  if (!scope) {
    mapping = `'${property}'`
  } else {
    const k1 = 'theme'
    const k2 = scope
    const p1 = `${k1}${optional.theme ? '?' : ''}.`
    const p2 = `${k2}${(optional[part1] || optional[part2]) ? '?' : ''}.`
    const p3 = property
    mapping = `${p1}${p2}${p3}`
  }
  return mapping
}

function reportMessages(node, context, scope, fourLevel = false) {
  const otional = getMemberExpressionNodeOptinalObject(node, ['theme', scope])
  const part1 = fourLevel ? node.object.object.property.name : node.object.property.name
  const part2 = fourLevel ? node.object.property.name : node.property.name
  const part3 = fourLevel ? node.property.name : null

  const fixedText = getVariableMappingInNewTheme(part1, part2, part3, otional)
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
      description: 'This rule facilitates the deprecation of elements(e.g header, footer, body, link) variables in the classic theme and provides automatic fixes to replace these elements variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-border.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme elements(e.g header, footer, body, link) variables and and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'header', ['color', 'bg']])) {
          reportMessages(node, context, 'header')
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'footer', ['color', 'bg']])) {
          reportMessages(node, context, 'footer')
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'body', ['color', 'bg', ...fontStyles]])) {
          reportMessages(node, context, 'body')
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'link', ['color', 'decoration']])) {
          reportMessages(node, context, 'link')
        } else if (isSpecifiedMemberExpressionNode(node, ['theme', 'link', 'hover', ['color', 'decoration']])) {
          reportMessages(node, context, 'link', true)
        }
      }
    }
  }
}
