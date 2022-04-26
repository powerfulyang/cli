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
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          mjs: 'always',
        },
      ],
      'import/no-unresolved': [2, { ignore: ['\\.mjs$'] }],
    },
  })),
};
