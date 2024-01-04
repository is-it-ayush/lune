module.exports = {
  extends: [require.resolve("@repo/lint/next")],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
};
