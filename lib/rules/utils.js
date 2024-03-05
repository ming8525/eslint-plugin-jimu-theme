const ThemeColors = ['primary', 'secondary', 'danger', 'warning', 'info', 'success']
const CommonColors = ['white', 'black']
const ThemeCommonColors = ThemeColors.concat(CommonColors)
const LightDarkColors = ['light', 'dark']
const ThemePaletteShades = ['100', '200', '300', '400', '500', '600', '700', '800', '900']


function getNormalizedColorName(inputColorName) {
  let colorName = inputColorName
  if (colorName === 'danger') {
    colorName = 'error'
  }
  return colorName
}

function getNormalizedColorShade(inputShape) {
 if(['100', '200', '300'].includes(inputShape)) {
  return 'light'
 } else if(['400', '500', '600'].includes(inputShape)) {
  return 'main'
 } else if(['700', '800', '900'].includes(inputShape)) {
  return 'dark'
 }
}

function isEqualOrContains(var1, var2) {
  return var1 === var2 || (Array.isArray(var1) && var1.includes(var2));
}

function isSpecifiedMemberExpressionNode(node, identifiers) {
  if (!node || node.type !== 'MemberExpression' || !Array.isArray(identifiers) || identifiers.length === 0) {
    return false;
  }

  let currentNode = node;

  for (let i = identifiers.length - 1; i >= 0; i--) {
    const identifier = identifiers[i];

    if(!currentNode) return false

    if (i === 0 && currentNode.type === 'Identifier' && isEqualOrContains(identifier, currentNode.name )) {
      return true;
    }
    if(currentNode.type !== 'MemberExpression') {
      return false
    }

    if (!isEqualOrContains(identifier, currentNode.computed ? currentNode.property.raw : currentNode.property.name)) {
      return false;
    }

    currentNode = currentNode.object;
  }

  return false;
}


module.exports = { ThemeCommonColors, ThemePaletteShades, getNormalizedColorName, getNormalizedColorShade, isSpecifiedMemberExpressionNode }
