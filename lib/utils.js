const DocURL = 'https://github.com/ming8525/eslint-plugin-jimu-theme/blob/develop/docs/rules/'
const ThemeColors = ['primary', 'secondary', 'danger', 'warning', 'info', 'success']
const CommonColors = ['white', 'black']
const LightDarkColors = ['light', 'dark']
const ThemeCommonColors = ThemeColors.concat(CommonColors)
const ThemeAllColors = ThemeCommonColors.concat(LightDarkColors)
const ThemeLightDarkColors = ThemeColors.concat(LightDarkColors)
const ThemePaletteShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900']

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

const TypographyStylesMap = {
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  color: 'paperText',
  fontSize: 'fontSize',
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

function isStringNumber(str) {
  return /^[-+]?[0-9]*\.?[0-9]+$/.test(str)
}

function getColorNameAndScopeInNewTheme(inputColorName) {
  let scope = 'sys.color'
  let colorName = inputColorName
  if (colorName === 'danger') {
    colorName = 'error'
  } else if (colorName === 'light' || colorName === 'dark') {
    scope = 'ref.palette'
    colorName = 'neutral'
  } else if (colorName === 'white' || colorName === 'black') {
    scope = 'ref.palette'
  }
  return { scope, colorName }
}

function getColorShadeInNewTheme(inputColorName, inputShape) {
  if (ThemeColors.includes(inputColorName)) {
    if (['100', '200', '300'].includes(inputShape)) {
      return 'light'
    } else if (['400', '500', '600'].includes(inputShape)) {
      return 'main'
    } else if (['700', '800', '900'].includes(inputShape)) {
      return 'dark'
    }
  } else if (inputColorName === 'light') {
    if (inputShape === '100') {
      return '200'
    } else if (inputShape === '200') {
      return '300'
    } else if (inputShape === '300') {
      return '400'
    } else if (inputShape === '400' || inputShape === '500') {
      return '500'
    } else if (inputShape === '600' || inputShape === '700') {
      return '600'
    } else if (inputShape === '800' || inputShape === '900') {
      return '700'
    }
  } else if (inputColorName === 'dark') {
    if (inputShape === '100' || inputShape === '200') {
      return '800'
    } else if (inputShape === '300' || inputShape === '400') {
      return '900'
    } else if (inputShape === '500' || inputShape === '600') {
      return '1000'
    } else if (inputShape === '700' || inputShape === '800') {
      return '1100'
    } else if (inputShape === '900') {
      return '1200'
    }
  }
}

const defaultOptional = {
  theme: false,
  colors: false,
  palette: false,
  orgSharedColors: false
}

function getColorVariableMappingInNewTheme(inputColorName, inputShape, optional = defaultOptional) {
  let mapping = ''
  const { scope, colorName } = getColorNameAndScopeInNewTheme(inputColorName)
  const k1 = 'theme'
  const k2 = scope
  const p1 = `${k1}${optional.theme ? '?' : ''}.`
  const p2 = `${k2}${(optional.colors || optional.palette) ? '?' : ''}.`

  if (inputShape) {
    const colorShade = getColorShadeInNewTheme(inputColorName, inputShape)
    if (ThemeColors.includes(inputColorName)) {
      const isNumberShade = isStringNumber(colorShade)
      const p3 = `${colorName}${isNumberShade ? '' : '.'}`
      const p4 = isNumberShade ? `[${colorShade}]` : colorShade
      mapping = `${p1}${p2}${p3}${p4}`
    } else if (LightDarkColors.includes(inputColorName)) {
      const p3 = colorName
      const p4 = `[${colorShade}]`
      mapping = `${p1}${p2}${p3}${p4}`
    }
  } else {
    if (ThemeColors.includes(inputColorName)) {
      const p3 = `${colorName}.`
      const p4 = 'main'
      mapping = `${p1}${p2}${p3}${p4}`
    } else if (CommonColors.includes(inputColorName)) {
      const p3 = colorName
      const p4 = ''
      mapping = `${p1}${p2}${p3}${p4}`
    } else if (LightDarkColors.includes(inputColorName)) {
      const colorShade = inputColorName === 'light' ? '200' : '1200'
      const p3 = colorName
      const p4 = `[${colorShade}]`
      mapping = `${p1}${p2}${p3}${p4}`
    } else if (inputColorName === 'transparent') {
      mapping = '\'transparent\''
    }
  }
  return mapping
}

function getSharedColorVariableMappingInNewTheme(colorName, colorShade, optional = defaultOptional) {
  let mapping = ''
  const scope = 'mixin.sharedTheme'
  const k1 = 'theme'
  const k2 = scope
  const p1 = `${k1}${optional.theme ? '?' : ''}.`
  const p2 = `${k2}${(optional.colors || optional.orgSharedColors) ? '?' : ''}.`
  const p3 = `${colorName}.`
  const p4 = colorShade
  mapping = `${p1}${p2}${p3}${p4}`
  return mapping
}

function getColorCSSVariableMappingInNewTheme(inputColorName, inputShape) {
  let mapping = ''
  const { scope, colorName } = getColorNameAndScopeInNewTheme(inputColorName)
  const p1 = 'var(--'
  const p2 = scope.replace('.', '-')
  const p5 = ')'
  if (inputShape) {
    const colorShade = getColorShadeInNewTheme(inputColorName, inputShape)
    if (ThemeColors.includes(inputColorName)) {
      const p3 = `-${colorName}`
      const p4 = `-${colorShade}`
      mapping = `${p1}${p2}${p3}${p4}${p5}`
    } else if (LightDarkColors.includes(inputColorName)) {
      const p3 = `-${colorName}`
      const p4 = `-${colorShade}`
      mapping = `${p1}${p2}${p3}${p4}${p5}`
    }
  } else {
    if (ThemeColors.includes(inputColorName)) {
      const p3 = `-${colorName}`
      const p4 = '-main'
      mapping = `${p1}${p2}${p3}${p4}${p5}`
    } else if (CommonColors.includes(inputColorName)) {
      const p3 = `-${colorName}`
      const p4 = ''
      mapping = `${p1}${p2}${p3}${p4}${p5}`
    } else if (LightDarkColors.includes(inputColorName)) {
      const colorShade = inputColorName === 'light' ? '200' : '1200'
      const p3 = `-${colorName}`
      const p4 = `-${colorShade}`
      mapping = `${p1}${p2}${p3}${p4}${p5}`
    } else if (inputColorName === 'transparent') {
      mapping = 'transparent'
    }
  }
  return mapping
}

function getSharedColorCSSVariableMappingInNewTheme(colorName, colorShade) {
  let mapping = ''
  const p1 = 'var(--'
  const p2 = 'mixin-shared-theme'
  const p5 = ')'
  const p3 = `-${colorName}`
  const p4 = `-${colorShade}`
  mapping = `${p1}${p2}${p3}${p4}${p5}`
  return mapping
}

const UtilitiesMap = {
  'text-dark': 'text-default',
  'text-dark-400': 'hint-default',
  'text-dark-600': 'hint-paper',
  'text-black': 'text-overlay',
  'bg-light': 'bg-paper',
  'bg-light-300': 'bg-default',
  'bg-white': 'bg-overlay',
  'border-light': 'border-color-tertiary',
  'border-light-500': 'border-color-secondary',
  'border-light-800': 'border-color-primary',
  'rounded-none': 'rounded-0',
  'rounded': 'rounded-1',
  'rounded-sm': 'rounded-0',
  'rounded-lg': 'rounded-2',
  'shadow-none': 'shadow-0',
  'shadow': 'shadow',
  'shadow-sm': 'shadow-1',
  'shadow-lg': 'shadow-3',
  'setting-text-level-0': 'title2 text-paper',
  'setting-text-level-1': 'title2 hint-paper',
  'setting-text-level-2': 'title3 text-default',
  'setting-text-level-3': 'title3 hint-default',
  'text-title': 'text-default',
  'text-normal': 'text-paper',
  'text-caption': 'hint-paper',
  'text-disabled': 'text-disabled',
  'text-muted': 'text-disabled',
  'font-h1': 'h1 text-default',
  'font-h2': 'h2 text-default',
  'font-h3': 'h3 text-default',
  'font-h4': 'h4 text-default',
  'font-h5': 'h5 text-default',
  'font-h6': 'h6 text-default',
  'font-body1': 'body1 text-paper',
  'font-body2': 'body2 text-paper',
  'font-caption1': 'caption1 hint-paper',
  'font-caption2': 'caption2 hint-paper',
}

function getCSSUtilitiesMappingInNewTheme(input) {
  if (!input) return
  return UtilitiesMap[input]
}

function isEqualOrContains(var1, var2) {
  return var1 === var2 || (Array.isArray(var1) && var1.includes(var2))
}

function isSpecifiedObjectOptinal(node, identifier) {
  if (!node || node.type !== 'MemberExpression') {
    return false
  }

  let optionalIdentifierFound = false

  const traverseNode = (node) => {
    if (node.optional) {
      const object = node.object
      if (object.type === 'Identifier' && object.name === identifier) {
        optionalIdentifierFound = true
        return
      }
      if (object.type === 'MemberExpression' && (object.computed ? object.property.raw : object.property.name) === identifier) {
        optionalIdentifierFound = true
        return
      }
    }
    if (node.object && node.object.type === 'MemberExpression') {
      traverseNode(node.object)
    }
  }

  traverseNode(node)

  return optionalIdentifierFound
}

function getiOptinalMemberExpressionObjectInfo(object, identifiers) {
  const info = {}
  if (object.type === 'Identifier' && identifiers.includes(object.name)) {
    info.name = object.name
    info.optional = true
  } else if (object.type === 'MemberExpression') {
    const propertyName = object.computed ? object.property.raw : object.property.name
    if (identifiers.includes(propertyName)) {
      info.name = propertyName
      info.optional = true
    }
  }
  return info
}

function getMemberExpressionNodeOptinalObject(node, identifiers) {
  if (!node || node.type !== 'MemberExpression') {
    return false
  }
  let optionalObject = {}
  identifiers.forEach(function (identifier) {
    optionalObject[identifier] = false
  })

  const traverseNode = (node) => {
    if (node.optional) {
      const object = node.object
      const info = getiOptinalMemberExpressionObjectInfo(object, identifiers)
      if (info.optional) {
        optionalObject[info.name] = true
      }
    }
    if (node.object && node.object.type === 'MemberExpression') {
      traverseNode(node.object)
    }
  }

  traverseNode(node)

  return optionalObject
}

function isSpecifiedMemberExpressionNode(node, identifiers, longest = true) {
  if (!node || node.type !== 'MemberExpression' || !Array.isArray(identifiers) || identifiers.length === 0) {
    return false
  }
  if (longest && node.parent && node.parent.type === 'MemberExpression') {
    return false
  }

  let currentNode = node

  for (let i = identifiers.length - 1; i >= 0; i--) {
    const identifier = identifiers[i]

    if (!currentNode) return false

    if (i === 0 && currentNode.type === 'Identifier' && isEqualOrContains(identifier, currentNode.name)) {
      return true
    }
    if (i === 0 && currentNode.type === 'ThisExpression' && isEqualOrContains(identifier, 'this')) {
      return true
    }
    if (currentNode.type !== 'MemberExpression') {
      return false
    }

    if (!isEqualOrContains(identifier, currentNode.computed ? currentNode.property.raw : currentNode.property.name)) {
      return false
    }

    currentNode = currentNode.object
  }

  return false
}

function getLastTwoNodesName(node, preNode) {
  if (!node) return
  if (node.type === 'Identifier') {
    if (preNode) {
      return [node.name, preNode.property.name]
    } else {
      return [node.name]
    }
    
  } else if (node.type === 'ThisExpression') {
    return [`this.${preNode.property.name}`, preNode.parent.property.name]
  } else if (node.type === 'MemberExpression') {
    return getLastTwoNodesName(node.object, node)
  }
}

function isTargetFromSource(context, target, sources = []) {
  const targetDefinition = context.getScope().variables.find(variable => variable.name === target)

  if (targetDefinition) {
    const initNode = targetDefinition.defs[0].node && targetDefinition.defs[0].node.init
    const memberExpressionNode = getValidMemberExpression(initNode)
    if (!memberExpressionNode) return false
    const nodeNames = getLastTwoNodesName(memberExpressionNode)
    const isFromSource = sources.some(function (source) {
      if (source.length === 2) {
        return nodeNames[0] === source[0] && nodeNames[1] === source[1]
      } else if (source.length === 1) {
        return nodeNames[0] === source[0]
      }
    })
    return isFromSource
  }
}

function isSpecifiedMemberExpressionNodeFromThemeProps(node, identifiers, sourceProps = {}) {
  const match = isSpecifiedMemberExpressionNode(node, identifiers, true)
  if (match && sourceProps.source) {
    const { context, target, source } = sourceProps
    const fromSource = isTargetFromSource(context, target, [[source], ['props', source], ['this.props', source]])
    return fromSource
  }
  return match
}

function isSpecifiedScopeMemberExpressionNode(node, identifiers, sourceProps = {}) {
  let match = false, usedProps = null
  if (isSpecifiedMemberExpressionNodeFromThemeProps(node, identifiers, sourceProps)) {
    match = true
  } else if (sourceProps.prefixProps && sourceProps.prefixProps.length) {
    match = isSpecifiedMemberExpressionNode(node, [...sourceProps.prefixProps, ...identifiers], true)
    if (match) {
      usedProps = sourceProps.prefixProps
    } else {
      match = isSpecifiedMemberExpressionNode(node, ['this', ...sourceProps.prefixProps, ...identifiers], true)
      if (match) {
        usedProps = ['this', ...sourceProps.prefixProps]
      }
    }
  }
  return { match, usedProps }
}

function getValidMemberExpression(node) {
  if (!node) return node
  if (node.type === 'ChainExpression') return node.expression
  else if (node.type === 'LogicalExpression') {
    if(node.left.type === 'Identifier' || node.left.type === 'MemberExpression') return node.left
    else  if(node.right.type === 'Identifier' || node.right.type === 'MemberExpression') return node.right
  }
  return node
}

function uppercaseFirstLetter(string) {
  if (!string) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  DocURL,
  ThemeCommonColors,
  ThemeAllColors,
  ThemeLightDarkColors,
  ThemePaletteShades,
  TypographyVariantsMap,
  TypographyColorsMap,
  TypographyLineHeightsMap,
  TypographyStylesMap,
  TypographyWeightsMap,
  uppercaseFirstLetter,
  getSharedColorVariableMappingInNewTheme,
  getColorNameAndScopeInNewTheme,
  getColorShadeInNewTheme,
  isSpecifiedMemberExpressionNode,
  getValidMemberExpression,
  isSpecifiedScopeMemberExpressionNode,
  isSpecifiedObjectOptinal,
  getMemberExpressionNodeOptinalObject,
  getColorVariableMappingInNewTheme,
  getColorCSSVariableMappingInNewTheme,
  getSharedColorCSSVariableMappingInNewTheme,
  getCSSUtilitiesMappingInNewTheme
}
