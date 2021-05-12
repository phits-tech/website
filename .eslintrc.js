module.exports = {
  env: { es2021: true, node: true, browser: true, jest: true },
  extends: ['.eslintrc-js.js'],
  ignorePatterns: ['**/node_modules', '**/dist', '**/lib', '.*/**/*'],
  overrides: [
    { files: ['*.ts'], extends: ['.eslintrc-ts.js'] },
    {
      files: ['*.vue'],
      extends: ['.eslintrc-vue.js'],
      rules: {
        // URGENT: Fix errors & remove these exceptions
        'unicorn/filename-case': 'off'
      }
    }
  ],
  root: true,
  rules: {
    // URGENT: Fix errors & remove these exceptions
    'unicorn/filename-case': 'off'
  }
}
