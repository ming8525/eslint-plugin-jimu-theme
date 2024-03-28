# This rule updates variables from old classic theme to new theme (`jimu-theme/no-classic-variables`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Options

<!-- begin auto-generated rule options list -->

| Name            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Type     | Default                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------- | :-------------------------------------------------------- |
| `preThemeProps` | This property is used to define the expression before the `theme` keyword. This plug-in identifies theme variables based on full-length expression matching.<br/>            For example, by default we will identify `this.props.theme.<variable>` but not `this.nextProps.theme.<variable>`, because this.nextProps does not exist in the default `preThemeProps`. The latter can be identified by identifying preThemeProps as `[this, ['props', 'nextProps']]`. | Array    | [`this`, `['this', 'props', 'prevProps', 'pageContext']`] |
| `themeAliases`  | The plug-in determines whether a variable is a theme variable based on the "theme" keyword. If you use another name, define it through this property.                                                                                                                                                                                                                                                                                                               | String[] | [`theme`, `theme2`, `builderTheme`, `appTheme`]           |

<!-- end auto-generated rule options list -->
