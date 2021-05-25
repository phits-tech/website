module.exports = {
  extends: ['plugin:vue/vue3-recommended', '@vue/standard', '@vue/typescript/recommended', '.eslintrc-js.js'],
  rules: {
    // Additional
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
  }
}
