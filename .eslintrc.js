module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'guard-for-in': 'off'
  },
};
