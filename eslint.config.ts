import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // 禁用不可达代码检查
      'no-unreachable': 'off',
      'no-unreachable-code': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // 禁用死代码检查
      'no-dead-code': 'off',
      // 允许空块
      'no-empty': 'off',
      // 允许空函数
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // 保留其他有用的检查
      'no-unused-vars': 'warn', // 改为警告而不是错误
    }
  }
)
