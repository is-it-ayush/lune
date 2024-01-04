module.exports = {
  extends: [require.resolve("@repo/lint/library")],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
};
