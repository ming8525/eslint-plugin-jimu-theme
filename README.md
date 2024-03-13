# eslint-plugin-jimu-theme

This plug-in is used to assist in migrating jimu-theme variables to the new version.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-jimu-theme`:

```sh
npm install eslint-plugin-jimu-theme --save-dev
```

## Usage

Add `jimu-theme` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "jimu-theme"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "jimu-theme/rule-name": 2
    }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                | 🔧 |
| :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :- |
| [no-classic-colors](docs/rules/no-classic-colors.md)                                                   | This rule updates color variables from old classic theme to new theme.                                                                                                                                                                                                                                                                                     | 🔧 |
| [no-classic-css-utilities](docs/rules/no-classic-css-utilities.md)                                     | This rule facilitates the upgrade of css utilities from the classic theme to the new theme.                                                                                                                                                                                                                                                                | 🔧 |
| [no-classic-css-vars](docs/rules/no-classic-css-vars.md)                                               | This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme.                                                                                                                                                                                                                                         | 🔧 |
| [no-classic-css-vars-style](docs/rules/no-classic-css-vars-style.md)                                   | This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme in style.                                                                                                                                                                                                                                | 🔧 |
| [no-classic-theme-colors-palette-assignment](docs/rules/no-classic-theme-colors-palette-assignment.md) | Disallow directly access `theme.colors` or `theme.colors.palette` in variable assignment. Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios.                                                                                      |    |
| [no-empty-classname](docs/rules/no-empty-classname.md)                                                 | Remove empty className attributes from React components.                                                                                                                                                                                                                                                                                                   | 🔧 |
| [no-gutters](docs/rules/no-gutters.md)                                                                 | This rule facilitates the deprecation of gutter variables in the theme and provides automatic fixes to replace these gutter variables with specific values.                                                                                                                                                                                                | 🔧 |
| [no-unnecessary-template-vars](docs/rules/no-unnecessary-template-vars.md)                             | Remove unnecessary template string variables. Note: If it is used for theme upgrade, this rule should be called after other rules for upgrading the theme to fix abnormal results caused by the upgrade.                                                                                                                                                   | 🔧 |
| [prefer-direct-theme-colors-access](docs/rules/prefer-direct-theme-colors-access.md)                   | This rule ensures that theme colors are accessed directly through the theme object (e.g., theme.colors.primary) rather than via intermediary variables (e.g., colors.primary). Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios. | 🔧 |

<!-- end auto-generated rules list -->


