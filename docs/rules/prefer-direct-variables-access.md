# This rule ensures that theme variables are accessed directly through the theme object (e.g., theme.colors.primary) rather than via intermediary variables (e.g., colors.primary). Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios (`jimu-theme/prefer-direct-variables-access`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Options

<!-- begin auto-generated rule options list -->

| Name            | Type    | Default |
| :-------------- | :------ | :------ |
| `applyToBorder` | Boolean | `false` |

<!-- end auto-generated rule options list -->
