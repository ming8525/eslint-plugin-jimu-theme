'use strict'
const { DocURL, matchNodeIdentifiers, flattenUnique, createIdentifierProp, getVariablesPath, AllowedMidVars, DefaultPreThemeProps, DefaultThemeAliases, ThemeLightDarkColors, ThemePaletteShades } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'This rule is to check whether there are any remaining classical variables.',
      recommended: false,
      url: `${DocURL}no-classic-variables-left.md`,
    },
    fixable: 'code',
    messages: {
      message: 'Classic theme variables should not exist.',
      invalid: 'Invalid color variable, please confirm if you need it, if so please replace it with `{{newVar}}`'
    },
    schema: [
      {
        type: 'object',
        properties: {
          themeAliases: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: DefaultThemeAliases,
            description: 'The plug-in determines whether a variable is a theme variable based on the "theme" keyword. If you use another name, define it through this property.'
          },
          preThemeProps: {
            type: 'array',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              ],
            },
            default: ['this', '[\'this\', \'props\', \'prevProps\', \'pageContext\']'],
            description: `This property is used to define the expression before the \`theme\` keyword. This plug-in identifies theme variables based on full-length expression matching.
            For example, by default we will identify \`this.props.theme.<variable>\` but not \`this.nextProps.theme.<variable>\`, because this.nextProps does not exist in the default \`preThemeProps\`. The latter can be identified by identifying preThemeProps as \`[this, ['props', 'nextProps']]\`.`
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const option = context.options[0] || {}
    const preThemeProps = option.preThemeProps || DefaultPreThemeProps
    const themeAliases = option.themeAliases || DefaultThemeAliases
    const allowedThemeProps = flattenUnique(preThemeProps.concat(themeAliases))
    return {
      MemberExpression(node) {
        const variables = context.getScope().variables
        let props = null
        if ((props = matchNodeIdentifiers(node, [...preThemeProps, themeAliases, 'colors', ThemeLightDarkColors, ThemePaletteShades], variables, allowedThemeProps))) {
          let mappings = []
          let prevIdentifier = ''
          props.forEach((prop) => {
            if (prop.type === 'identifier' || themeAliases.includes(prop.identifier) || AllowedMidVars.includes(prop.identifier)) {
              if (prop.identifier === 'colors' && themeAliases.includes(prevIdentifier)) {
                mappings.push(prop)
                mappings.push(createIdentifierProp('palette', prop.optional, false))
              } else {
                mappings.push(prop)
              }
            }
            prevIdentifier = prop.identifier
          })
          const newVar = getVariablesPath(mappings)
          context.report({
            node: node,
            data: {
              newVar
            },
            messageId: 'invalid',
          })
        } else if (matchNodeIdentifiers(node, [themeAliases, ['colors', 'border', 'borderRadiuses', 'boxShadows', 'sizes', 'surfaces', 'typography', 'header', 'footer', 'body', 'link', 'darkTheme']], variables, themeAliases, false)) {
          context.report({
            node: node,
            messageId: 'message',
          })
        }
      }
    }
  }
}
