const rules = require("./utils/rules");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "universe/native"
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "/*.config.js"],
  root: true,
  ...rules
};
