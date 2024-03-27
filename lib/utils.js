const DocURL = 'https://github.com/ming8525/eslint-plugin-jimu-theme/blob/develop/docs/rules/'
const ThemeColors = ['primary', 'secondary', 'danger', 'warning', 'info', 'success']
const CommonColors = ['white', 'black']
const LightDarkColors = ['light', 'dark']
const ThemeCommonColors = ThemeColors.concat(CommonColors)
const ThemeAllColors = ThemeCommonColors.concat(LightDarkColors)
const ThemeLightDarkColors = ThemeColors.concat(LightDarkColors)
const ThemePaletteShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
const DefaultThemeAliases = ['theme', 'theme2', 'builderTheme', 'appTheme']
const DefaultPreThemeProps = ['this', ['this', 'props', 'prevProps', 'pageContext']]
// These theme variables allow copying as intermediate variables in variable scope
const AllowedMidVars = ['colors', 'typography', 'link']
const FontStyles = ['fontFamily', 'fontWeight', 'fontSize', 'fontStyle', 'lineHeight']

function flattenUnique(arr) {
  return [...new Set(arr.flat())]
}

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
    } else if (!inputShape || ['400', '500', '600'].includes(inputShape)) {
      return 'main'
    } else if (['700', '800', '900'].includes(inputShape)) {
      return 'dark'
    }
  } else if (inputColorName === 'light') {
    if (inputShape === '100' || !inputShape) {
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
    } else if (inputShape === '900' || !inputShape) {
      return '1200'
    }
  } else if (['header', 'body', 'button'].includes(inputColorName)) {
    return inputShape
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

const UtilitiesStylesMap = {
  'bg-success': { backgroundColor: 'var(--sys-color-success)' },
  'text-danger': { color: 'var(--sys-color-error)' },
  'bg-primary' : { backgroundColor: 'var(--sys-color-primary)' },
  'bg-secondary': { backgroundColor: 'var(--sys-color-secondary)' },
  'bg-transparent': { backgroundColor: 'transparent' },
}

function getCSSUtilitiesMappingInNewTheme(input) {
  if (!input) return
  let utilityMap = UtilitiesMap[input]
  if(!utilityMap) {
    utilityMap = UtilitiesStylesMap[input]
  }
  return utilityMap
}

function isEqualOrContains(var1, var2) {
  return var1 === var2 || (Array.isArray(var1) && var1.includes(var2))
}

function hasCommonItem(arr1, arr2) {
  return arr1.some(item => arr2.includes(item))
}

function isEqualOrCrossContains(var1, var2) {
  if (var1 === var2) return true
  if (Array.isArray(var1) && !Array.isArray(var2)) {
    return var1.includes(var2)
  } else if (Array.isArray(var2) && !Array.isArray(var1)) {
    return var2.includes(var1)
  } else if (Array.isArray(var1) && Array.isArray(var2)) {
    if (var1.length === 1) {
      return var2.includes(var1[0])
    } else if (var2.length === 1) {
      return var1.includes(var2[0])
    } else {
      return hasCommonItem(var1, var2)
    }
  }
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

function getNodeProperty(node) {
  let optional = false
  let prpperty = ''
  if (node) {
    if (node.type === 'ThisExpression') {
      prpperty = 'this'
    } if (node.type === 'Identifier') {
      optional = !!node.optional
      prpperty = node.name
    } else if (node.type === 'MemberExpression') {
      optional = !!node.optional
      prpperty = node.computed ? node.property.raw : node.property.name
    }
  }
  return { prpperty, optional }
}

function getVariableDefinitionProperty(definition) {
  let node = null
  let properties = []
  let isPlainVariable = true
  const defNode = definition && definition.defs[0].node
  if (defNode) {
    if (defNode.type === 'VariableDeclarator') {
      const id = defNode.id
      if (id.type === 'ObjectPattern') {
        isPlainVariable = false
        properties = id.properties.map((property) => property.value.name)
        node = defNode.init
      } else {
        const initNode = defNode.init
        node = getValidMemberExpression(initNode)
        const res = getNodeProperty(node)
        properties = [res.prpperty]
      }
    }

  }
  return [node, properties, isPlainVariable]
}

function matchNodeIdentifiers(node, identifiers = [], variables = [], allowedThemeProps, longest = true) {
  if (!node || node.type !== 'MemberExpression' || identifiers.length === 0) {
    return
  }
  if (longest && node.parent && node.parent.type === 'MemberExpression') {
    return false
  }
  let res = []
  let inVariableContext = false //Only check variable scope once
  const traverseNode = (type, node, identifiers, variables, prevIdentifier) => {
    const { prpperty, optional } = getNodeProperty(node)
    if (node) {
      const identifier = identifiers.pop()
      if (!identifier) return true
      const equal = isEqualOrContains(identifier, prpperty)
      // if prpperty is not match with identifier
      if (!equal) return false
      res.unshift({ type, identifier: prpperty, optional })
      return traverseNode(type, node.object, identifiers, variables, prpperty)
    } else if (variables) {
      if (!inVariableContext) {
        inVariableContext = true
        const definition = variables.find(variable => variable.name === prevIdentifier)
        const [variableNode, variableProperties, isPlainVariable] = getVariableDefinitionProperty(definition)
        const equal = isEqualOrCrossContains(prevIdentifier, variableProperties)
        // if variable property is match with previous identifier
        if (equal) {
          return traverseNode('variable', isPlainVariable ? variableNode.object : variableNode, identifiers, variables, prevIdentifier)
        } else if ((allowedThemeProps.includes(prevIdentifier))) {
          return true
        }
      } else {
        return allowedThemeProps.includes(prevIdentifier)
      }

    }
  }

  const valid = traverseNode('identifier', node, identifiers, variables)
  return valid ? res : false
}

function getColorMappingScope(part) {
  let scope = 'sys.color'
  let property = part.identifier
  if (part.identifier === 'danger') {
    property = 'error'
  } else if (part.identifier === 'light' || part.identifier === 'dark') {
    scope = 'ref.palette'
    property = 'neutral'
  } else if (part.identifier === 'white' || part.identifier === 'black') {
    scope = 'ref.palette'
    property = part.identifier
  } else if (part.identifier === 'transparent') {
    scope = ''
    property = '\'transparent\''
  } else if (ThemeColors.includes(part.identifier)) {
    scope = 'sys.color'
    property = part.identifier
  } else if (['header', 'body', 'button'].includes(part.identifier)) {
    scope = 'mixin.sharedTheme'
    property = part.identifier
  }
  return { scope, property }
}

function createIdentifierProp(identifier, optional = false, called = false) {
  return { type: 'identifier', identifier, optional, called }
}

function getColorsPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let part3 = props[2]
  let part4 = props[3]
  if (part1.identifier === 'colors' && part2.identifier !== 'palette' && part2.identifier !== 'orgSharedColors') {
    const { scope, property } = getColorMappingScope(part2)
    if (!scope) {
      type = 'string'
      mappings = [createIdentifierProp(property, false)]
    } else {
      mappings.push(createIdentifierProp(scope, part1.optional))
      mappings.push(createIdentifierProp(property, part2.optional))
      const shade = getColorShadeInNewTheme(part2.identifier)
      if (shade) {
        mappings.push(createIdentifierProp(shade, false))
      }
    }
  } else if (part2.identifier === 'palette' || part2.identifier === 'orgSharedColors') {
    const { scope, property } = getColorMappingScope(part3)
    const shade = getColorShadeInNewTheme(part3.identifier, part4.identifier)
    mappings.push(createIdentifierProp(scope, part1.optional || part2.optional))
    mappings.push(createIdentifierProp(property, part3.optional))
    mappings.push(createIdentifierProp(shade, part4.optional))
  }
  return { type, mappings }
}

function getBorderPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  if (part2.identifier === 'color') {
    mappings.push(createIdentifierProp('sys.color.divider', part1.optional))
    mappings.push(createIdentifierProp('primary', part2.optional))
  } else {
    type = 'string'
    const property = part2.identifier === 'type' ? '\'solid\'' : '\'1px\''
    mappings.push(createIdentifierProp(property, part2.optional))
  }

  return { type, mappings }
}

function getBorderRadiusPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  if (part2.identifier === 'default' || part2.identifier === 'lg') {
    const property = part2.identifier === 'default' ? 'shape1' : 'shape2'
    mappings.push(createIdentifierProp('sys.shape', part1.optional))
    mappings.push(createIdentifierProp(property, part2.optional))
  } else {
    type = 'string'
    const property = part2.identifier === 'none' ? '\'none\'' : '\'0px\''
    mappings.push(createIdentifierProp(property, part2.optional))
  }

  return { type, mappings }
}

function getShadowPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  if (part2.identifier === 'none') {
    type = 'string'
    const property = '\'none\''
    mappings.push(createIdentifierProp(property, part2.optional))
  } else {
    let property = part2.identifier === 'default' ? 'shape1' : 'shape2'
    if (part2.identifier === 'default') {
      property = 'shadow2'
    } else if (part2.identifier === 'sm') {
      property = 'shadow1'
    } else if (part2.identifier === 'lg') {
      property = 'shadow3'
    }
    mappings.push(createIdentifierProp('sys.shadow', part1.optional))
    mappings.push(createIdentifierProp(property, part2.optional))
  }

  return { type, mappings }
}

function getSizesPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  const property = part2.identifier
  mappings.push(createIdentifierProp('sys.spacing', part1.optional))
  mappings.push(createIdentifierProp(property, part2.optional, true))
  return { type, mappings }
}

const GuttersMap = {
  0: '0px',
  1: '1px',
  2: '2px',
  3: '4px',
  4: '8px',
  5: '10px'
}

function getGuttersPropsMapping(props) {
  let type = 'string'
  let mappings = []
  let part2 = props[1]
  const property = `'${GuttersMap[part2.identifier]}'`
  mappings.push(createIdentifierProp(property, part2.optional, true))
  return { type, mappings }
}


function getSurfacePropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let part3 = props[2]
  let part4 = props[3]

  let scope = ''
  let property = ''
  if (part3.identifier === 'border') {
    if (part4.identifier === 'color') {
      scope = 'sys.color.divider'
      property = 'secondary'
    } else {
      type = 'string'
      scope = ''
      property = part4.identifier === 'type' ? '\'solid\'' : '\'1px\''
    }
  } else {
    if (part3.identifier === 'bg') {
      scope = 'sys.color.surface'
      property = part2.identifier === '1' ? 'paper' : 'overlay'
    } else if (part3.identifier === 'shadow') {
      if (part2.identifier === '1') {
        type = 'string'
        scope = ''
        property = '\'none\''
      } else {
        scope = 'sys.shadow'
        property = 'shadow2'
      }
    }
  }
  if (scope) {
    mappings.push(createIdentifierProp(scope, part1.optional))
  }
  mappings.push(createIdentifierProp(property, part2.optional || part3.optional))
  return { type, mappings }
}

const TypographyColorMap = {
  display: 'backgroundText',
  body: 'paperText',
  caption: 'paperHint',
}

function getTypographyMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let part3 = props[2]
  let part4 = props[3]

  let scope = ''
  let property = ''
  let shade = ''
  if (part2.identifier === 'variants') {
    scope = 'sys.typography'
    property = TypographyVariantsMap[part3.identifier]
    if (part4) {
      if (part4.identifier === 'color') {
        scope = 'sys.color.surface'
        property = TypographyColorMap[part3.identifier.slice(0, -1)]
        mappings.push(createIdentifierProp(scope, part1.optional || part2.optional))
        mappings.push(createIdentifierProp(property, part3.optional || part4.optional))
      } else {
        shade = part4.identifier
        mappings.push(createIdentifierProp(scope, part1.optional || part2.optional))
        mappings.push(createIdentifierProp(property, part3.optional))
        mappings.push(createIdentifierProp(shade, part4.optional))
      }
    } else {
      mappings.push(createIdentifierProp(scope, part1.optional || part2.optional))
      mappings.push(createIdentifierProp(property, part3.optional))
    }
  } else if (['fontFamilyBase', 'fontSizeRoot', 'fontSizeBase'].includes(part2.identifier)) {
    scope = 'ref.typeface'
    if (part2.identifier === 'fontFamilyBase') {
      property = 'fontFamily'
    } else if (part2.identifier === 'fontSizeRoot') {
      property = 'htmlFontSize'
    } else if (part2.identifier === 'fontSizeBase') {
      property = 'fontSize'
    }
    mappings.push(createIdentifierProp(scope, part1.optional))
    mappings.push(createIdentifierProp(property, part2.optional))
  } else {
    if (part2.identifier === 'sizes') {
      scope = 'sys.typography'
      property = TypographyVariantsMap[part3.identifier]
      shade = 'fontSize'
    } else if (part2.identifier === 'colors') {
      scope = part3.identifier === 'disabled' ? 'sys.color.action' : 'sys.color.surface'
      property = TypographyColorsMap[part3.identifier]
    } else if (part2.identifier === 'weights') {
      scope = 'ref.typeface'
      property = TypographyWeightsMap[part3.identifier]
    } else if (part2.identifier === 'lineHeights') {
      scope = ''
      type = 'string'
      property = TypographyLineHeightsMap[part3.identifier]
    }
    if (scope) {
      mappings.push(createIdentifierProp(scope, part1.optional || part2.optional))
    }
    mappings.push(createIdentifierProp(property, part3.optional))
    if (shade) {
      mappings.push(createIdentifierProp(shade, false))
    }
  }

  return { type, mappings }
}

function getFocusedStylesPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  if (part2.identifier === 'color') {
    mappings.push(createIdentifierProp('sys.color.action', part1.optional))
    mappings.push(createIdentifierProp('focus', part2.optional))
  } else {
    type = 'string'
    const property = '\'2px\''
    mappings.push(createIdentifierProp(property, part2.optional))
  }
  return { type, mappings }
}

function getHeaderFooterPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let scope = `comp?.${uppercaseFirstLetter(part1.identifier)}.root.vars`
  const property = part2.identifier
  mappings.push(createIdentifierProp(scope, part1.optional))
  mappings.push(createIdentifierProp(property, part2.optional))
  return { type, mappings }
}

function getBodyPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let scope = ''
  let property = ''
  if (FontStyles.includes(part2.identifier)) {
    if (part2.identifier === 'fontStyle') {
      type = 'string'
      scope = ''
      property = '\'unset\''
    } else {
      scope = 'sys.typography.body2'
      property = part2.identifier
    }
  } else if (part2.identifier === 'color' || part2.identifier === 'bg') {
    scope = 'sys.color.surface'
    property = part2.identifier === 'color' ? 'backgroundText' : 'background'
  }
  if (scope) {
    mappings.push(createIdentifierProp(scope, part1.optional))
  }
  mappings.push(createIdentifierProp(property, part2.optional))
  return { type, mappings }
}

function getLinkPropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let part2 = props[1]
  let part3 = props[2]
  let scope = ''
  let property = ''
  if (part2.identifier === 'hover' && part3) {
    if (part3.identifier === 'decoration') {
      type = 'string'
      scope = ''
      property = '\'underline\''
    } else {
      scope = 'sys.color.action.link'
      property = 'hover'
    }
  } else {
    if (part2.identifier === 'decoration') {
      type = 'string'
      scope = ''
      property = '\'none\''
    } else {
      scope = 'sys.color.action.link'
      property = 'default'
    }
  }
  if (scope) {
    mappings.push(createIdentifierProp(scope, part1.optional))
  }
  mappings.push(createIdentifierProp(property, part2.optional))
  return { type, mappings }
}

function getDarkThemePropsMapping(props) {
  let type = 'identifier'
  let mappings = []
  let part1 = props[0]
  let scope = 'sys.color.mode === \'dark\''
  mappings.push(createIdentifierProp(scope, part1.optional))
  return { type, mappings }
}

function getPropsMapping(props, preThemeProps, themeAliases) {
  const allowedThemeProps = flattenUnique(preThemeProps.concat(themeAliases))
  let mappings = []
  let prevIdentifier = ''
  props.forEach((prop, idx) => {
    if (prop.type === 'identifier' || themeAliases.includes(prop.identifier) || AllowedMidVars.includes(prop.identifier)) {
      if (allowedThemeProps.includes(prop.identifier)) {
        mappings.push(prop)
      } else {
        if (prop.identifier === 'colors' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getColorsPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'border' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getBorderPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'borderRadiuses' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getBorderRadiusPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'boxShadows' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getShadowPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'sizes' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getSizesPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'gutters' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getGuttersPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'surfaces' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getSurfacePropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'typography' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getTypographyMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'focusedStyles' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getFocusedStylesPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'header' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getHeaderFooterPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'footer' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getHeaderFooterPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'body' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getBodyPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'link' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getLinkPropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        } else if (prop.identifier === 'darkTheme' && themeAliases.includes(prevIdentifier)) {
          const { type, mappings: _mappings } = getDarkThemePropsMapping(props.slice(idx))
          mappings = type === 'string' ? _mappings : mappings.concat(_mappings)
        }
      }
    }
    prevIdentifier = prop.identifier
  })
  return mappings
}

function getVariableMappingInNewTheme(props, themeAliases, preThemeProps) {
  let mapping = ''
  if (!props || !props.length) return mapping
  const mappings = getPropsMapping(props, preThemeProps, themeAliases)
  let path = ''
  if (mappings.length === 1) {
    path = mappings[0].identifier
  } else if (mappings.length > 1) {
    mappings.forEach((mapping) => {
      const isNumberIdentifier = isStringNumber(mapping.identifier)
      let sp = isNumberIdentifier ? `${mapping.optional ? '?.' : ''}[${mapping.identifier}]` : `${mapping.optional ? '?' : ''}.${mapping.identifier}`
      if (mapping.called) {
        sp = `${mapping.optional ? '?.' : ''}(${mapping.identifier})`
      }
      path += sp
    })
    path = path.replace(/^\??\./g, '')
  }
  return path
}

function reportMessages(node, context, props) {
  const option = context.options[0] || {}
  const themeAliases = option.themeAliases || DefaultThemeAliases
  const preThemeProps = option.preThemeProps || DefaultPreThemeProps

  const fixedText = getVariableMappingInNewTheme(props, themeAliases, preThemeProps)
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

const messagesForSpecialCase = {
  surface: (node, context, props) => {
    const level = props[2].identifier
    const isSpreadElementArgument =
      node.parent && node.parent.type === 'SpreadElement'
    const newVar = `{
      bg: theme.sys.color.surface.${level === '1' ? 'paper' : 'overlay'},
      border: {
        color: theme.sys.color.divider.secondary,
        width: '1px'
      },
      shadow: ${level === '1' ? '\'none\'' : 'theme.sys.shadow.shadow2'}
    }`
    const fixedText = isSpreadElementArgument ? `(${newVar})` : newVar
    const rawCode = context.sourceCode.getText(node)
    context.report({
      node: node,
      messageId: 'message',
      data: {
        oldVar: rawCode,
        newVar: fixedText,
      },
      fix: function (fixer) {
        return fixer.replaceText(node, fixedText)
      },
    })
  }
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
    if (node.left.type === 'Identifier' || node.left.type === 'MemberExpression') return node.left
    else if (node.right.type === 'Identifier' || node.right.type === 'MemberExpression') return node.right
  }
  return node
}

function uppercaseFirstLetter(string) {
  if (!string) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  DocURL,
  FontStyles,
  DefaultThemeAliases,
  DefaultPreThemeProps,
  ThemeCommonColors,
  ThemeAllColors,
  ThemeLightDarkColors,
  ThemePaletteShades,
  TypographyVariantsMap,
  TypographyColorsMap,
  TypographyLineHeightsMap,
  TypographyStylesMap,
  TypographyWeightsMap,
  flattenUnique,
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
  getCSSUtilitiesMappingInNewTheme,
  matchNodeIdentifiers,
  getVariableMappingInNewTheme,
  messagesForSpecialCase,
  reportMessages
}
