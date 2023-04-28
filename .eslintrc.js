/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:16
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 13:56:13
 * @FilePath     : \h5-auto\.eslintrc.js
 * @Description  : 
 */
module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
