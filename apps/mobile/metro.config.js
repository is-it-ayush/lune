const path = require("path");
const { getDefaultConfig } = require('expo/metro-config');

const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  watchFolders: [workspaceRoot],
  resolver: {
    unstable_enableSymlinks: true
  }
});

module.exports = config;
