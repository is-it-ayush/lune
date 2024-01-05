module.exports = function (api) {
  api.cache(true);

  // plugins.
  const plugins = [];
  plugins.push('nativewind/babel');

  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};
