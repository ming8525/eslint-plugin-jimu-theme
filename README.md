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

| Name                                                                                               | Description                                                                                                                                      | 🔧 |
| :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :- |
| [no-classic-colors-directly](docs/rules/no-classic-colors-directly.md)                             | This rule is used to assist identify code that directly uses `colors.<color>` to access theme variables without using `theme.` as prefix.        | 🔧 |
| [no-classic-css-vars](docs/rules/no-classic-css-vars.md)                                           | Detect and fix classic theme css vars                                                                                                            | 🔧 |
| [no-classic-palette-directly](docs/rules/no-classic-palette-directly.md)                           | This rule is used to assist identify code that directly uses `palette.<color>` to access theme variables without using `theme.colors` as prefix. | 🔧 |
| [no-classic-theme-colors](docs/rules/no-classic-theme-colors.md)                                   | This rule is used to assist in migrating color variables in `theme.colros` to the new version.                                                   | 🔧 |
| [no-classic-theme-colors-access-directly](docs/rules/no-classic-theme-colors-access-directly.md)   | disallow directly access theme.colors in variable assignment                                                                                     |    |
| [no-classic-theme-palette](docs/rules/no-classic-theme-palette.md)                                 | This rule is used to assist in migrating color variables in `theme.colors.palette` to the new version.                                           | 🔧 |
| [no-classic-theme-palette-access-directly](docs/rules/no-classic-theme-palette-access-directly.md) | disallow directly access theme.colors.palette in variable assignment                                                                             |    |
| [utils](docs/rules/utils.md)                                                                       |                                                                                                                                                  |    |

<!-- end auto-generated rules list -->


