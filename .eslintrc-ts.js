module.exports = {
  extends: ['standard-with-typescript', '.eslintrc-js.js'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: ['*/**/tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  rules: {
    // Disable rules that don't understand TypeScript
    'no-redeclare': 'off',
    'no-undef': 'off',
    'no-useless-constructor': 'off',

    // TypeScript
    // TODO: Consider reviewing ALL typescript-eslint rules
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
    '@typescript-eslint/space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    '@typescript-eslint/strict-boolean-expressions': ['error', { allowString: true, allowNullableString: true }]
  }
}
