const ThemeColors = ['primary', 'secondary', 'danger', 'warning', 'info', 'success']
const CommonColors = ['white', 'black']
const LightDarkColors = ['light', 'dark']
const ThemeCommonColors = ThemeColors.concat(CommonColors)
const ThemeAllColors = ThemeCommonColors.concat(LightDarkColors)
const ThemeLightDarkColors = ThemeColors.concat(LightDarkColors)
const ThemePaletteShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900']

function isStringNumber(str) {
  return /^[-+]?[0-9]*\.?[0-9]+$/.test(str);
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

function isEqualOrContains(var1, var2) {
  return var1 === var2 || (Array.isArray(var1) && var1.includes(var2));
}

function isSpecifiedObjectOptinal(node, identifier) {
  if (!node || node.type !== 'MemberExpression') {
    return false;
  }

  let optionalIdentifierFound = false;

  const traverseNode = (node) => {
    if (node.optional) {
      const object = node.object
      if (object.type === 'Identifier' && object.name === identifier) {
        optionalIdentifierFound = true;
        return
      }
      if (object.type === 'MemberExpression' && (object.computed ? object.property.raw : object.property.name) === identifier) {
        optionalIdentifierFound = true;
        return;
      }
    }
    if (node.object && node.object.type === 'MemberExpression') {
      traverseNode(node.object);
    }
  };

  traverseNode(node);

  return optionalIdentifierFound;
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
    return false;
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
        optionalObject[info.name] = true;
      }
    }
    if (node.object && node.object.type === 'MemberExpression') {
      traverseNode(node.object);
    }
  };

  traverseNode(node);

  return optionalObject;
}

function isSpecifiedMemberExpressionNode(node, identifiers) {
  if (!node || node.type !== 'MemberExpression' || !Array.isArray(identifiers) || identifiers.length === 0) {
    return false;
  }

  let currentNode = node;

  for (let i = identifiers.length - 1; i >= 0; i--) {
    const identifier = identifiers[i];

    if (!currentNode) return false

    if (i === 0 && currentNode.type === 'Identifier' && isEqualOrContains(identifier, currentNode.name)) {
      return true;
    }
    if (currentNode.type !== 'MemberExpression') {
      return false
    }

    if (!isEqualOrContains(identifier, currentNode.computed ? currentNode.property.raw : currentNode.property.name)) {
      return false;
    }

    currentNode = currentNode.object;
  }

  return false;
}

module.exports = {
  ThemeCommonColors,
  ThemeAllColors,
  ThemeLightDarkColors,
  ThemePaletteShades,
  getSharedColorVariableMappingInNewTheme,
  getColorNameAndScopeInNewTheme,
  getColorShadeInNewTheme,
  isSpecifiedMemberExpressionNode,
  isSpecifiedObjectOptinal,
  getMemberExpressionNodeOptinalObject,
  getColorVariableMappingInNewTheme,
  getColorCSSVariableMappingInNewTheme,
  getSharedColorCSSVariableMappingInNewTheme
}
