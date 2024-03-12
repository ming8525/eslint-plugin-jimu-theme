const path = require('path')
const mocha = require('mocha')
const { RuleTester } = require('@typescript-eslint/rule-tester')
RuleTester.afterAll = mocha.after

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: path.join(__dirname, '../../fixture'),
  }
})

module.exports = { ruleTester }
