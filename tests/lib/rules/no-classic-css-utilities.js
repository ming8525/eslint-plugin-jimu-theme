const { ruleTester } = require('../utils')
const rule = require('../../../lib/rules/no-classic-css-utilities')

const options = [{ removeDeprecated: true }]

ruleTester.run('no-classic-css-utilities', rule, {
  valid: [
    {
      code: 'const component = () => { return <div className=\'foo\' /> }'
    },
    {
      code: 'const component = () => { return <div className=\'foo bar foo-bar\' /> }'
    }
  ],

  invalid: [
    {
      code: 'const component = () => { return <div className=\'foo text-primary\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options
    },
    {
      code: 'const component = () => { return <div className=\'foo text-primary bar\' /> }',
      output: 'const component = () => { return <div className=\'foo bar\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options
    },
    {
      code: 'const component = () => { return <div className=\'text-primary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options
    },
    {
      code: 'const component = () => { return <div className=\'text-primary foo bar\' /> }',
      output: 'const component = () => { return <div className=\'foo bar\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options
    },
    {
      code: 'const component = () => { return <div className=\'text-primary\' /> }',
      output: 'const component = () => { return <div className=\'\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options
    },

    {
      code: 'const component = () => { return <div className=\'text-primary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-secondary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-success foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-info foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-warning foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-danger foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-white foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-black foo\' /> }',
      output: 'const component = () => { return <div className=\'text-overlay foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'text-transparent foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark foo\' /> }',
      output: 'const component = () => { return <div className=\'text-default foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'bg-primary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-secondary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-success foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-info foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-warning foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-danger foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-white foo\' /> }',
      output: 'const component = () => { return <div className=\'bg-overlay foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'bg-black foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-transparent foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light foo\' /> }',
      output: 'const component = () => { return <div className=\'bg-paper foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-primary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-secondary foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-success foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-info foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-warning foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-danger foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-white foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-black foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-transparent foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light foo\' /> }',
      output: 'const component = () => { return <div className=\'border-color-tertiary foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'border-dark foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },

    {
      code: 'const component = () => { return <div className=\'text-light-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-light-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'hint-default foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'hint-paper foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'text-dark-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'bg-default foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-light-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'bg-dark-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'border-color-secondary foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'border-light-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-light-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'border-color-primary foo\' /> }',
      errors: [{ messageId: 'replace', type: 'Literal' }],
    },
    {
      code: 'const component = () => { return <div className=\'border-light-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-100 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-200 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-300 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-400 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-500 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-600 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-700 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-800 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    },
    {
      code: 'const component = () => { return <div className=\'border-dark-900 foo\' /> }',
      output: 'const component = () => { return <div className=\'foo\' /> }',
      errors: [{ messageId: 'deprecated', type: 'Literal' }],
      options,
    }
  ],
})
