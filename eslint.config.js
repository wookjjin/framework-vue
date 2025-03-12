// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-console': 'off',
      'vue/operator-linebreak': ['error', 'before'],
      'antfu/top-level-function': 'off',
      'vue/no-required-prop-with-default': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-definitions': 'off',
      'antfu/top-level-function': 'off',
      'semi': 'error',
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'no-var': 'off',
      'dot-notation': 'off',
    },
  },
)
