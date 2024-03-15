'use strict'
const { DocURL, isSpecifiedMemberExpressionNode, isSpecifiedObjectOptinal, getMemberExpressionNodeOptinalObject, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades, TypographyVariantsMap, TypographyStylesMap, TypographyColorsMap, TypographyWeightsMap, TypographyLineHeightsMap } = require('../utils')


function reportMessages(node, context, p1) {
  const sourceCode = context.sourceCode
  const rawCode = sourceCode.getText(node)
  const fixedText = `${p1}${rawCode}`
  context.report({
    node: node,
    messageId: 'message',
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  })
}

function reportNoPropsMessages(node, context) {
  const sourceCode = context.sourceCode
  const rawCode = sourceCode.getText(node)
  const fixedText = rawCode.replace(/props\??\./, '')
  context.report({
    node: node,
    messageId: 'noUsedFromProps',
    fix: function (fixer) {
      return fixer.replaceText(node, fixedText)
    }
  })
}

function isSpecifiedPropedMemberExpressionNode(node, identifiers, prefixProps = []) {
  let match = false, usedProps = null
  if (isSpecifiedMemberExpressionNode(node, identifiers, true)) {
    match = true
  } else if (prefixProps.length) {
    match = isSpecifiedMemberExpressionNode(node, [...prefixProps, ...identifiers], true)
    if (match) {
      usedProps = prefixProps
    }
  }
  return { match, usedProps }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule ensures that theme variables are accessed directly through the theme object (e.g., theme.colors.primary) rather than via intermediary variables (e.g., colors.primary). Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios.',
      recommended: false,
      url: `${DocURL}prefer-direct-variables-access.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Prefer accessing theme variables directly via theme.* instead of using intermediary variables.',
      noUsedFromProps: 'Prefer accessing theme variables directly via theme.* instead of using from props'
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression(node) {
        let res = null
        if (((res = isSpecifiedPropedMemberExpressionNode(node, ['colors', [...ThemeAllColors, 'transparent']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'colors')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['colors', 'palette', ThemeLightDarkColors, ThemePaletteShades], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['colors', 'palette'])
            const p1 = (optional.colors || optional.palette) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['palette', ThemeLightDarkColors, ThemePaletteShades], ['props', 'theme', 'colors'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'palette')
            const p1 = optional ? 'theme?.colors?.' : 'theme.colors.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['borderRadiuses', ['none', 'sm', 'default', 'lg']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'borderRadiuses')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['border', ['type', 'color', 'width']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'border')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['focusedStyles', ['offset', 'color', 'width']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'focusedStyles')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['boxShadows', ['none', 'sm', 'default', 'lg']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'boxShadows')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['sizes', ['0', '1', '2', '3', '4', '5', '6']], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'sizes')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'variants', Object.keys(TypographyVariantsMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'variants'])
            const p1 = (optional.typography || optional.variants) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'variants'])
            const p1 = (optional.typography || optional.variants) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'sizes', Object.keys(TypographyVariantsMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'sizes'])
            const p1 = (optional.typography || optional.sizes) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'colors', Object.keys(TypographyColorsMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'colors'])
            const p1 = (optional.typography || optional.colors) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'weights', Object.keys(TypographyWeightsMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'weights'])
            const p1 = (optional.typography || optional.weights) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedPropedMemberExpressionNode(node, ['typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)], ['props', 'theme'])).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'lineHeights'])
            const p1 = (optional.typography || optional.lineHeights) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if(((res = isSpecifiedPropedMemberExpressionNode(node, [['header', 'footer'], ['color', 'bg']], ['props', 'theme'])).match)) {
          if(!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['header', 'footer'])
            const p1 = (optional.header || optional.footer) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if(((res = isSpecifiedPropedMemberExpressionNode(node, ['link', ['color', 'decoration']], ['props', 'theme'])).match)) {
          if(!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'link')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        }  else if(((res = isSpecifiedPropedMemberExpressionNode(node, ['link', 'hover', ['color', 'decoration']], ['props', 'theme'])).match)) {
          if(!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'link')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if(((res = isSpecifiedPropedMemberExpressionNode(node, ['body', ['color', 'bg','fontFamily', 'fontWeight', 'fontSize', 'fontStyle', 'lineHeight']], ['props', 'theme'])).match)) {
          if(!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'body')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        }
      }
    }
  }
}