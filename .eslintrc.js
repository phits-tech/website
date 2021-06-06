module.exports = {
  env: { es2021: true, node: true, browser: true, jest: true },
  extends: ['.eslintrc-js.js'],
  ignorePatterns: ['**/.*/**/*', '**/node_modules', '**/dist', '**/lib'],
  overrides: [
    { files: ['hosting/src/_services/**/*.ts'], extends: ['.eslintrc-ts.js'] },
    { files: ['hosting/**/*.ts', 'hosting/**/*.vue'], extends: ['.eslintrc-vue.js'] },
    { files: ['**/*.ts'], extends: ['.eslintrc-ts.js'] }
  ],
  root: true
}
