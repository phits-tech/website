// TODO: Continue exploring: https://github.com/dustinspecker/awesome-eslint#practices
module.exports = {
  extends: ['plugin:jest/recommended', 'standard'],
  plugins: ['radar', 'simple-import-sort', 'unicorn', 'unused-imports', 'woke'],
  rules: {
    // Override
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect', 'assertSucceeds', 'assertFails'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],

    // Additional
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@phits-tech/common/dist/**/*', '@phits-tech/common/src/**/*']
      }
    ],
    'radar/no-all-duplicated-branches': 'error',
    'radar/no-element-overwrite': 'error',
    'radar/no-extra-arguments': 'error',
    'radar/no-identical-conditions': 'error',
    'radar/no-identical-expressions': 'error',
    'radar/no-one-iteration-loop': 'error',
    'radar/no-use-of-empty-return-value': 'error',
    'radar/cognitive-complexity': 'error',
    'radar/max-switch-cases': 'error',
    'radar/no-collapsible-if': 'error',
    'radar/no-collection-size-mischeck': 'error',
    'radar/no-duplicate-string': 'error',
    'radar/no-duplicated-branches': 'error',
    'radar/no-identical-functions': 'error',
    'radar/no-inverted-boolean-check': 'error',
    'radar/no-redundant-boolean': 'error',
    'radar/no-redundant-jump': 'error',
    'radar/no-same-line-conditional': 'error',
    'radar/no-small-switch': 'error',
    'radar/no-unused-collection': 'error',
    'radar/no-useless-catch': 'error',
    'radar/prefer-immediate-return': 'error',
    'radar/prefer-object-literal': 'error',
    'radar/prefer-single-boolean-return': 'error',
    'radar/prefer-while': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^(@(?!phits-tech))?\\w'], // Packages (start with a letter, digit, underscore, or `@` followed by a letter)
          ['^@phits-tech'], // Our packages
          ['^', '^\\.\\.'], // Same project (not matched in another group or starting with 2 dots)
          ['^\\.'], // Local (anything that starts with 1 dot)
          ['^\\u0000'] // Side-effects
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true
        }
      }
    ],
    'unicorn/import-index': 'error',
    'unicorn/import-style': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-push-push': 'error',
    'unicorn/no-array-reduce': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-keyword-prefix': 'error',
    'unicorn/no-lonely-if': 'error',
    'unicorn/no-nested-ternary': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-null': 'error',
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-process-exit': 'off',
    'unicorn/no-this-assignment': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-dataset': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-math-trunc': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/string-content': 'error',
    'unicorn/throw-new-error': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'woke/LGBTQ': 'error',
    'woke/gender': 'error',
    'woke/profanity': 'error',
    'woke/racism': 'error'
  }
}
