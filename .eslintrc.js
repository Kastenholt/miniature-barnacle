module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb'],
  env: {
    browser: true,
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    quotes: [
      'error',
      'single',
    ],
    'import/no-import-module-exports': 0,
    'no-console': ['warn', {
      allow: [
        'warn',
        'error',
        'info',
      ],
    }],
  },
};
