module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['prettier', 'airbnb-base'],

  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 'off',
    'no-restricted-syntax': ['off'],
    'no-await-in-loop': ['off'],
    'comma-dangle': ['off'],
    'no-param-reassign': ['off'],
  },
};
