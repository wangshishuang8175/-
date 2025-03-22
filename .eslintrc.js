/* eslint-env node */
module.exports = {
  root: true, // 表示这是ESLint配置的根目录
  extends: [
    'plugin:vue/vue3-essential', // 使用Vue3的基本规则
    'eslint:recommended' // 使用ESLint推荐的规则
  ],
  parserOptions: {
    ecmaVersion: 'latest' // 使用最新的ECMAScript版本
  },
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭组件名必须多单词的规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境警告console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 生产环境警告debugger
  }
} 