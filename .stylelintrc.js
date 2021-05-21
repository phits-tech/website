module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines', 'stylelint-config-property-sort-order-smacss'],
  rules: {
    // Override
    'no-empty-source': undefined,
    'order/properties-alphabetical-order': undefined,
    'declaration-block-trailing-semicolon': undefined,

    // Additional
    'function-name-case': ['lower', { ignoreFunctions: [/^[a-z][\dA-Za-z]+$/] }],
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'layer'] }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'export'] }]
  }
}
