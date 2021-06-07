module.exports = {
  extends: ['.eslintrc-js.js', 'standard-with-typescript'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: ['*/**/tsconfig.json'],
    sourceType: 'module',
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
