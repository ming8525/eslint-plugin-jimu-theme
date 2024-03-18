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

## Note

This plugin is only for assisting in `jimu-theme` upgrades and should not be used for other purposes.

The rules `prefer-direct-variables-access` and `no-classic-variables-assignment` are designed to standardize the usage of theme variables, such as:

```
colors.primary => theme.colors.primary
props.theme.colors.primary => theme.colors.primary
palette.primary[100] => theme.colors.palette.primary[100]
border.color => theme.border.color
```

Place it as the first rule in the ruleset.

The `no-classic-*` rules are used to upgrade corresponding variables, for example:

```
theme.colors.primary => theme.sys.color.primary.main
```

In the `eslintrc`, place it after the `prefer-direct-variables-access` rule.

The `no-unnecessary-template-vars` and `no-empty-classname` rules are intended to clean up abnormal code after a theme upgrade, such as:

```
color: ${'transparent'}; => color: transparent;
<div className=''></div> => <div></div>
```

These rules need to be placed after `no-classic-*`.

Furthermore, after automatic fixing, there might still be incorrect code remaining, which requires reviewing each file individually.
We recommend autofixing files one by one rather than applying a global autofix directly.

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                             | Description                                                                                                                                                                                                                                                                                                                                                   | 🔧 |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :- |
| [no-classic-border](docs/rules/no-classic-border.md)                             | This rule facilitates the deprecation of border variables in the classic theme and provides automatic fixes to replace these border variables with variables from the new theme or fallback values.                                                                                                                                                           | 🔧 |
| [no-classic-border-radius](docs/rules/no-classic-border-radius.md)               | This rule facilitates the deprecation of borderRadiuses variables in the classic theme and provides automatic fixes to replace these borderRadiuses variables with variables from the new theme or fallback values.                                                                                                                                           | 🔧 |
| [no-classic-colors](docs/rules/no-classic-colors.md)                             | This rule updates color variables from old classic theme to new theme.                                                                                                                                                                                                                                                                                        | 🔧 |
| [no-classic-css-utilities](docs/rules/no-classic-css-utilities.md)               | This rule facilitates the upgrade of css utilities from the classic theme to the new theme.                                                                                                                                                                                                                                                                   | 🔧 |
| [no-classic-css-vars](docs/rules/no-classic-css-vars.md)                         | This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme.                                                                                                                                                                                                                                            | 🔧 |
| [no-classic-css-vars-style](docs/rules/no-classic-css-vars-style.md)             | This rule facilitates the transition of CSS variables representing colors from the classic theme to the new theme in style.                                                                                                                                                                                                                                   | 🔧 |
| [no-classic-dark-theme](docs/rules/no-classic-dark-theme.md)                     | This rule facilitates the deprecation of `darkTheme` variables in the classic theme and provides automatic fixes to replace it with variables from the new theme.                                                                                                                                                                                             | 🔧 |
| [no-classic-elements](docs/rules/no-classic-elements.md)                         | This rule facilitates the deprecation of elements(e.g header, footer, body, link) variables in the classic theme and provides automatic fixes to replace these elements variables with variables from the new theme or fallback values.                                                                                                                       | 🔧 |
| [no-classic-focused-styles](docs/rules/no-classic-focused-styles.md)             | This rule facilitates the deprecation of `focusedStyles` variables in the classic theme and provides automatic fixes to replace these `focusedStyles` variables with variables from the new theme or fallback values.                                                                                                                                         | 🔧 |
| [no-classic-shadow](docs/rules/no-classic-shadow.md)                             | This rule facilitates the deprecation of `boxShadows` variables in the classic theme and provides automatic fixes to replace these boxShadows variables with variables from the new theme.                                                                                                                                                                    | 🔧 |
| [no-classic-sizes](docs/rules/no-classic-sizes.md)                               | This rule facilitates the deprecation of sizes variables in the classic theme and provides automatic fixes to replace these sizes variables with variables from the new theme.                                                                                                                                                                                | 🔧 |
| [no-classic-surface](docs/rules/no-classic-surface.md)                           | This rule facilitates the deprecation of surfaces variables in the classic theme and provides automatic fixes to replace these border variables with variables from the new theme or fallback values.                                                                                                                                                         | 🔧 |
| [no-classic-typography](docs/rules/no-classic-typography.md)                     | This rule facilitates the deprecation of typography variables in the classic theme and provides automatic fixes to replace these typography variables with variables from the new theme or fallback values.                                                                                                                                                   | 🔧 |
| [no-classic-variables-assignment](docs/rules/no-classic-variables-assignment.md) | Disallow directly access theme variables in variable assignment. Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios.                                                                                                                  |    |
| [no-empty-classname](docs/rules/no-empty-classname.md)                           | Remove empty className attributes from React components.                                                                                                                                                                                                                                                                                                      | 🔧 |
| [no-gutters](docs/rules/no-gutters.md)                                           | This rule facilitates the deprecation of gutter variables in the theme and provides automatic fixes to replace these gutter variables with specific values.                                                                                                                                                                                                   | 🔧 |
| [no-unnecessary-template-vars](docs/rules/no-unnecessary-template-vars.md)       | Remove unnecessary template string variables. Note: If it is used for theme upgrade, this rule should be called after other rules for upgrading the theme to fix abnormal results caused by the upgrade.                                                                                                                                                      | 🔧 |
| [prefer-direct-variables-access](docs/rules/prefer-direct-variables-access.md)   | This rule ensures that theme variables are accessed directly through the theme object (e.g., theme.colors.primary) rather than via intermediary variables (e.g., colors.primary). Note: This rule is only defined to help theme variable upgrades. It should be called before other rules for upgrading the theme, and should not be used in other scenarios. | 🔧 |

<!-- end auto-generated rules list -->


