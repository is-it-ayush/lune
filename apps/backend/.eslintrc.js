module.exports = {
  extends: [require.resolve("@lune/lint/library")],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  root: true,
};
