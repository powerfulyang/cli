const { eslint } = require('@powerfulyang/lint');

module.exports = {
  ...eslint,
  overrides: eslint.overrides.map((override) => ({
    ...override,
    rules: {
      ...override.rules,
      'no-console': 'off',
    },
  })),
};
