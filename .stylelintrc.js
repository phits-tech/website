module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-standard', 'stylelint-config-property-sort-order-smacss'],
  rules: {
    // Override
    'no-empty-source': undefined,
    'order/properties-alphabetical-order': undefined,
    'declaration-block-trailing-semicolon': undefined,

    // Additional
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer'] }],
    'function-name-case': ['lower', { ignoreFunctions: [/^[a-z][\dA-Za-z]+$/] }],
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['layer'] }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'export'] }]
  }
}
