import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 1,
      'vue/multi-word-component-names': 0,
      'vue/attribute-hyphenation': 0,
      'vue/v-on-event-hyphenation': 0,
      'vue/require-default-prop': 0,
    },
  },
  skipFormatting,
];
