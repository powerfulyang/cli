const { eslint } = require('@powerfulyang/lint');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'no-console': 'off',
  },
  overrides: eslint.overrides.map((override) => ({
    ...override,
    rules: {
      ...override.rules,
      'no-console': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          mjs: 'always',
          mts: 'never',
        },
      ],
    },
  })),
};
