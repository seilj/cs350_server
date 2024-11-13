import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier, // Prettier와 충돌하는 규칙 제거
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': ['error', { printWidth: 80 }],
      // 필요한 추가 규칙들 활성화
    },
  },
];
