module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-property-sort-order-smacss'
  ],
  rules: {
    // Disable (unwanted or conflicts)
    'no-empty-source': null,
    'order/properties-alphabetical-order': null,

    // Supplementary
    'function-name-case': [
      'lower',
      { ignoreFunctions: [/^[a-z][a-zA-Z0-9]+$/] }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export']
      }
    ]
  }
}
