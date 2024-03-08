const path = require('path')
const { RuleTester } = require('@typescript-eslint/rule-tester');
RuleTester.afterAll = mocha.after

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: path.join(__dirname, '../../fixture'),
  }
})

module.exports = { ruleTester }