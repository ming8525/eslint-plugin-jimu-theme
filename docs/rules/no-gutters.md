# This rule facilitates the deprecation of gutter variables in the theme and provides automatic fixes to replace these gutter variables with specific values (`jimu-theme/no-gutters`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Options

<!-- begin auto-generated rule options list -->

| Name            | Description                                                                                                                                           | Type     | Default                                                     |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------------------------------------------------------- |
| `preThemeProps` |                                                                                                                                                       | String[] | [`this`, `this,props,prevProps,pageContext`]                |
| `themeAliases`  | The plug-in determines whether a variable is a theme variable based on the "theme" keyword. If you use another name, define it through this property. | String[] | [`theme`, `theme2`, `exbTheme`, `builderTheme`, `appTheme`] |

<!-- end auto-generated rule options list -->
