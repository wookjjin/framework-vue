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
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
