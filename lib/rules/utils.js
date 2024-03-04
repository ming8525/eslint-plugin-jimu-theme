const themeColors = ['primary', 'secondary', 'danger', 'warning', 'info', 'success']

function getNormalizedColroName (inputColorName) {
  let colorName = inputColorName
  if (colorName === 'danger') {
    colorName = 'error'
  }
  return colorName
}

function isThemeColorsVariables(node) {
  return node.object && node.property && node.object.type === 'Identifier' &&
    node.object.name === 'theme' && node.property.type === 'Identifier' &&
    node.property.name === 'colors' && node.parent && node.parent.property &&
    node.parent.property.type === 'Identifier' && themeColors.includes(node.parent.property.name)
}

function isColorsVariables(node) {
  return node.object && node.property && node.object.type === 'Identifier' &&
    node.object.name === 'colors' && node.property.type === 'Identifier' && themeColors.includes(node.property.name)
}

module.exports = { themeColors, getNormalizedColroName, isThemeColorsVariables, isColorsVariables }
