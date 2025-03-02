// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'backup/**/*',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
  },
})
