module.exports = {
  ignorePatterns: ['.eslintrc.cjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0
  },
  plugins: ['@typescript-eslint'],
  root: true
}
