module.exports = {
  env: { node: true },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  root: true,
  rules: {
    // Overrides
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],
    'no-useless-constructor': 'off', // TS rule is more precise
    '@typescript-eslint/no-unused-vars': [
      2,
      { args: 'after-used', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: { delimiter: 'none', requireLast: false },
        singleline: { delimiter: 'semi', requireLast: false }
      }
    ],

    // Supplementary
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages (start with a letter, digit, underscore, or `@` followed by a letter)
          ['^(@(?!phits-tech))?\\w'],
          // Our packages
          ['^@phits-tech'],
          // Same project (not matched in another group or starting with 2 dots)
          ['^', '^\\.\\.'],
          // Local (anything that starts with 1 dot)
          ['^\\.'],
          // Side-effects
          ['^\\u0000']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      env: {
        es2021: true,
        node: true
      },
      extends: ['standard-with-typescript', 'plugin:jest/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: ['./tsconfig.json', '../common/tsconfig.json']
      },
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'simple-import-sort',
        'jest'
      ],
      rules: {
        // Overrides
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        '@typescript-eslint/space-before-function-paren': [
          'error',
          { anonymous: 'always', named: 'never', asyncArrow: 'always' }
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          { allowString: true, allowNullableString: true }
        ],
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'assertSucceeds', 'assertFails']
          }
        ],

        // Supplementary
        'unused-imports/no-unused-imports-ts': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages (start with a letter, digit, underscore, or `@` followed by a letter)
              ['^(@(?!phits-tech))?\\w'],
              // Our packages
              ['^@phits-tech'],
              // Same project (not matched in another group or starting with 2 dots)
              ['^', '^\\.\\.'],
              // Local (anything that starts with 1 dot)
              ['^\\.'],
              // Side-effects
              ['^\\u0000']
            ]
          }
        ],
        'simple-import-sort/exports': 'error'
      }
    }
  ]
}
