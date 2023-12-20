const { configure, presets } = require('eslint-kit');

const MAX_DEPTH = 4;
const MAX_NESTED_CALLBACKS = 3;
const MAX_PARAMS = 3;

module.exports = configure({
  presets: [
    presets.imports(),
    presets.node(),
    presets.typescript(),
    presets.react({
      version: '18.2',
    }),
    presets.nextJs(),
  ],
  extend: {
    extends: [
      'plugin:@conarti/feature-sliced/recommended',
      'plugin:tailwindcss/recommended',
    ],
    plugins: ['check-file'],
    overrides: [
      {
        files: ['pages/**/*', 'pages/api/*'],
        rules: {
          'import/no-default-export': 'off',
          '@conarti/feature-sliced/layers-slices': 'off',
          '@conarti/feature-sliced/absolute-relative': 'off',
          '@conarti/feature-sliced/public-api': 'off',
        },
      },
    ],
    rules: {
      // '@typescript-eslint/ban-types': [
      //   'error',
      //   {
      //     types: {
      //       'React.FC':
      //         'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
      //       FC:
      //         'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
      //       'React.FunctionComponent':
      //         'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
      //     },
      //   },
      // ],
      'unicorn/prefer-query-selector': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],
      'id-denylist': ['error', 'data', 'err', 'e', 'cb', 'callback'],
      'jsx-a11y/media-has-caption': 'warn',
      'max-depth': ['error', MAX_DEPTH],
      'max-nested-callbacks': ['error', MAX_NESTED_CALLBACKS],
      'max-params': ['error', MAX_PARAMS],
      'no-confusing-arrow': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-magic-numbers': [
        'error',
        {
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],
      'no-useless-catch': 'error',
      'no-useless-rename': 'error',
      'prefer-destructuring': 'error',
      'react/jsx-key': 'error',
      'react/no-unknown-property': 'warn',
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^.*\\u0000$'],
            ['^react', '^@?\\w'],
            ['^next', '^@?\\w'],
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^'],
            ['^\\.'],
          ],
        },
      ],
    },
  },
});
