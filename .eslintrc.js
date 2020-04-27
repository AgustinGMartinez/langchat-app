module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: { 'import/resolver': { node: { paths: ['./src'] } } },
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['sibling', 'parent', 'index']],
        'newlines-between': 'always',
      },
    ],
    'import/extensions': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
      },
    ],
    'no-return-await': 'error',
    eqeqeq: 'error',
    'no-unneeded-ternary': 'error',
    'no-console': 'error',
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
        },
        singleline: {
          delimiter: 'comma',
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}
