const { eslint } = require('@powerfulyang/lint');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'no-console': 'off',
    'import/no-unresolved': 'off',
  },
};
