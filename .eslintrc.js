module.exports = {
  env: { es2021: true, node: true, browser: true, jest: true },
  extends: ['.eslintrc-js.js'],
  ignorePatterns: ['**/node_modules', '**/dist', '**/lib', '.*/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['.eslintrc-ts.js'],
      rules: {
        // URGENT: Fix errors & remove these exceptions
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/no-null': 'off'
      }
    },
    {
      files: ['*.vue'],
      extends: ['.eslintrc-vue.js'],
      rules: {
        // URGENT: Fix errors & remove these exceptions
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/no-null': 'off'
      }
    }
  ],
  root: true
}
