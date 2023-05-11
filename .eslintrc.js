module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:storybook/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn',
    'import/order': 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
      },
    ],
    'no-param-reassign': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
  },
  ignorePatterns: [
    'coverage',
    'node_modules',
    './.husky',
    './.github',
    './.storybook',
  ],
};
