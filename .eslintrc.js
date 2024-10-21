module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/no-unescaped-entities': 'error', // This rule will catch unescaped entities
    '@typescript-eslint/no-unused-vars': 'warn', // Warns about unused variables
    '@typescript-eslint/no-explicit-any': 'warn', // Warns about usage of 'any' type
    'react/react-in-jsx-scope': 'off', // Disable the rule for React in scope
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
