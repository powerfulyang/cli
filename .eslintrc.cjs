// eslint-disable-next-line import/no-extraneous-dependencies
const { eslint } = require('@powerfulyang/lint');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'no-console': 'off',
  },
};
