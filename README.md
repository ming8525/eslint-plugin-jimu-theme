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
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


