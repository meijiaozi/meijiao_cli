module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-deprecated-v-on-native-modifier': 0,
    'vue/html-self-closing': 'off',
    'prettier/prettier': 'error',
    'no-extra-boolean-cast': 0, //禁止不必要的bool转换
    'vue/no-deprecated-destroyed-lifecycle': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-deprecated-dollar-listeners-api': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
