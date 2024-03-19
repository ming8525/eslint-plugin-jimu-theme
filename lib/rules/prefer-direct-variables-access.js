'use strict'
const { DocURL, isSpecifiedScopeMemberExpressionNode, isSpecifiedObjectOptinal, getMemberExpressionNodeOptinalObject, ThemeAllColors, ThemeLightDarkColors, ThemePaletteShades, TypographyVariantsMap, TypographyStylesMap, TypographyColorsMap, TypographyWeightsMap, TypographyLineHeightsMap } = require('../utils')


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
        if (((res = isSpecifiedScopeMemberExpressionNode(node, ['colors', [...ThemeAllColors, 'transparent']], { context, target: 'colors', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'colors')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['colors', 'palette', ThemeLightDarkColors, ThemePaletteShades], { context, target: 'colors', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['colors', 'palette'])
            const p1 = (optional.colors || optional.palette) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['palette', ThemeLightDarkColors, ThemePaletteShades], { context, target: 'palette', source: 'theme', prefixProps: ['props', 'theme', 'colors'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'palette')
            const p1 = optional ? 'theme?.colors?.' : 'theme.colors.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['borderRadiuses', ['none', 'sm', 'default', 'lg']], { context, target: 'borderRadiuses', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'borderRadiuses')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['border', ['type', 'color', 'width']], { context, target: 'border', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'border')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['focusedStyles', ['offset', 'color', 'width']], { context, target: 'focusedStyles', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'focusedStyles')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['boxShadows', ['none', 'sm', 'default', 'lg']], { context, target: 'boxShadows', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'boxShadows')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['sizes', ['0', '1', '2', '3', '4', '5', '6']], { context, target: 'sizes', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'sizes')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'variants', Object.keys(TypographyVariantsMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'variants'])
            const p1 = (optional.typography || optional.variants) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'variants', Object.keys(TypographyVariantsMap), Object.keys(TypographyStylesMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'variants'])
            const p1 = (optional.typography || optional.variants) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'sizes', Object.keys(TypographyVariantsMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'sizes'])
            const p1 = (optional.typography || optional.sizes) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'colors', Object.keys(TypographyColorsMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'colors'])
            const p1 = (optional.typography || optional.colors) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'weights', Object.keys(TypographyWeightsMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'weights'])
            const p1 = (optional.typography || optional.weights) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['typography', 'lineHeights', Object.keys(TypographyLineHeightsMap)], { context, target: 'typography', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = getMemberExpressionNodeOptinalObject(node, ['typography', 'lineHeights'])
            const p1 = (optional.typography || optional.lineHeights) ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['header', ['color', 'bg']], { context, target: 'header', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'header')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['footer', ['color', 'bg']], { context, target: 'footer', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'footer')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        }else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['link', ['color', 'decoration']], { context, target: 'link', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'link')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['link', 'hover', ['color', 'decoration']], { context, target: 'link', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'link')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['body', ['color', 'bg', 'fontFamily', 'fontWeight', 'fontSize', 'fontStyle', 'lineHeight']], { context, target: 'body', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'body')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['surfaces', ['1', '2'], ['bg', 'shadow']], { context, target: 'surfaces', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'surfaces')
            const p1 = optional ? 'theme?.' : 'theme.'
            reportMessages(node, context, p1)
          } else {
            reportNoPropsMessages(node, context)
          }
        } else if (((res = isSpecifiedScopeMemberExpressionNode(node, ['surfaces', ['1', '2'], 'border', ['color', 'width', 'type']], { context, target: 'surfaces', source: 'theme', prefixProps: ['props', 'theme'] })).match)) {
          if (!res.usedProps) {
            const optional = isSpecifiedObjectOptinal(node, 'surfaces')
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
