module.exports = {
  extends: [require.resolve("@lune/lint/next")],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
};
