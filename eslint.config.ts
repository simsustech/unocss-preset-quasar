import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  {
    ignores: ['**/components.d.ts']
  },
  ...typescriptEslint.configs.recommended,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          caughtErrors: 'none'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  /**
   * end
   */
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
)
