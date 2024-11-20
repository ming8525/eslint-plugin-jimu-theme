const path = require('path')
const mocha = require('mocha')
const { RuleTester } = require('@typescript-eslint/rule-tester')
RuleTester.afterAll = mocha.after

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
      projectService: {
        allowDefaultProject: ['*.js', 'project/builder/*.js', 'project/app/*.js'],
      },
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 6,
      tsconfigRootDir: path.join(__dirname, '../../fixture'),
      allowAutomaticSingleRunInference: true,
    }
  }
})

module.exports = { ruleTester }
