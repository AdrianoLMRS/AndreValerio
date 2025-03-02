import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '../.gitignore');

/** @type {import('eslint').Linter.Config} */
export default [
    includeIgnoreFile(gitignorePath),
    {
        // your overrides
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            parser: tsParser, // Definir o parser do TypeScript
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: { ...globals.browser, ...globals.node }
        },

        plugins: {
            '@typescript-eslint': tsPlugin
        },

        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tsPlugin.configs.recommended.rules, // Agora pega as regras corretamente

            'indent': ['warn', 4],
            'quotes': ['warn', 'single'],
            'semi': ['warn', 'always'],
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            'import/no-extraneous-dependencies': 'off'
        }
    }
];
