import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    vue: true,
    rules: {
      'no-console': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-empty-function': 'off',
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'ts/no-empty-object-type': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'vue/no-v-html': 'off',
      'vue/no-unused-vars': 'off',
      'vue/require-default-prop': 'off', // 关闭组件强制 prop 默认值
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
    },
  },
)
