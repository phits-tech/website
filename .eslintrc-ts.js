module.exports = {
  extends: ['.eslintrc-js.js', 'standard-with-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['**/tsconfig.eslint.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    // TypeScript
    // TODO: Consider reviewing ALL typescript-eslint rules
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
    '@typescript-eslint/space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    '@typescript-eslint/strict-boolean-expressions': ['error', { allowString: true, allowNullableString: true }]
  }
}
