'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, getMemberExpressionNodeOptinalObject } = require('../utils')

const TypographyVariantsMap = {
  display1: 'h1',
  display2: 'h2',
  display3: 'h3',
  display4: 'h4',
  display5: 'h5',
  display6: 'h6',
  body1: 'body1',
  body2: 'body2',
  caption1: 'label2',
  caption2: 'label3'
}

const TypographyColorsMap = {
  title: 'backgroundText',
  normal: 'paperText',
  caption: 'paperHint',
  disabled: 'disabled.text'
}

const TypographyWeightsMap = {
  extraLight: 'fontWeightLight',
  light: 'fontWeightLight',
  medium: 'fontWeightRegular',
  bold: 'fontWeightMedium',
  extraBold: 'fontWeightBold',
}

const TypographyLineHeightsMap = {
  medium: 1.5,
  sm: 1.3,
  lg: 1.7
}

function getTypographyNameAndScopeInNewTheme(part1, part2, part3) {
  let scope = 'sys.typography'
  let varName = part1
  let surfix = part3
  if (part1 === 'sizes') {
    varName = TypographyVariantsMap[part2]
  } else if (part1 === 'colors') {
    scope = part2 === 'disabled' ? 'sys.color.action' : 'sys.color.surface'
    varName = TypographyColorsMap[part2]
  } else if (part1 === 'weights') {
    scope = 'ref.typeface'
    varName = TypographyWeightsMap[part2]
  } else if (part1 === 'lineHeights') {
    scope = ''
    varName = TypographyLineHeightsMap[part2]
  } else if (part1 === 'variants') {
    scope = 'sys.typography'
    if (part3 === 'color') {
      scope = 'sys.color.surface'
      varName = ''
      surfix = 'backgroundText'
    } else {
      varName = TypographyVariantsMap[part2]
    }
  }
  return { scope, varName, surfix }
}

const defaultOptional = {
  theme: false
}

function getTypographyVariableMappingInNewTheme(part1, part2, part3, optional = defaultOptional) {
  let mapping = ''
  let { scope, varName, surfix } = getTypographyNameAndScopeInNewTheme(part1, part2, part3)
  const k1 = 'theme'
  const k2 = scope

  const p1 = `${k1}${optional.theme ? '?' : ''}.`
  const p2 = `${k2}${(optional[part1] || optional[part2]) ? '?' : ''}.`

  if (part1 === 'lineHeights') {
    mapping = `${varName}`
  } else if (part1 === 'sizes') {
    const p3 = `${varName}.`
    const p4 = 'fontSize'
    mapping = `${p1}${p2}${p3}${p4}`
  } else if (part1 === 'colors' || part1 === 'weights') {
    const p3 = varName
    mapping = `${p1}${p2}${p3}`
  } else if (part1 === 'variants') {
    if (surfix) {
      const p3 = varName ? `${varName}.` : ''
      mapping = `${p1}${p2}${p3}${surfix}`
    } else {
      const p3 = varName
      mapping = `${p1}${p2}${p3}`
    }

  }
  return mapping
}

function reportMessages(node, context, scope) {
  const otional = getMemberExpressionNodeOptinalObject(node, ['theme', scope])
  const fixedText = getTypographyVariableMappingInNewTheme(node.object.property.name, node.property.name, null, otional)
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

// console.log(getTypographyVariableMappingInNewTheme('variants', 'display2', 'fontSize', { theme: true, display2: true}))

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule facilitates the deprecation of typography variables in the classic theme and provides automatic fixes to replace these typography variables with variables from the new theme or fallback values.',
      recommended: false,
      url: `${DocURL}no-classic-colors.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Deprecate classic theme typography variables and replace them with variables from the new theme or fallback values. (\'{{oldVar}}\' → \'{{newVar}}\')',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (isSpecifiedMemberExpressionNode(node, ['theme', 'typography', 'sizes', Object.keys(TypographyVariantsMap)])) {
          reportMessages(node, context, 'sizes')
        } else  if (isSpecifiedMemberExpressionNode(node, ['theme', 'typography', 'colors', Object.keys(TypographyColorsMap)])) {
          reportMessages(node, context, 'colors')
        } else  if (isSpecifiedMemberExpressionNode(node, ['theme', 'typography', 'weights', Object.keys(TypographyWeightsMap)])) {
          reportMessages(node, context, 'weights')
        } else  if (isSpecifiedMemberExpressionNode(node, ['theme', 'typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)])) {
          reportMessages(node, context, 'lineHeights')
        }
      }
    }
  }
}
