const path = require('path')
const mocha = require('mocha')
const { RuleTester } = require('@typescript-eslint/rule-tester')
RuleTester.afterAll = mocha.after

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
      projectService: {
        allowDefaultProject: ['*.js'],
      },
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 6,
      tsconfigRootDir: path.join(__dirname, '../../fixture'),
    }
  }
})

module.exports = { ruleTester }
