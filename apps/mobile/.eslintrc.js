module.exports = {
  extends: [require.resolve("@lune/lint/native")],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
};
