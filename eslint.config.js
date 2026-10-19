import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // Pruebas: Jasmine define describe, it, expect, beforeEach y jasmine como globales
  {
    files: ['src/test/**/*.{js,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.jasmine } },
  },
  // Configuración de Karma (corre en Node)
  {
    files: ['karma.conf.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
])
