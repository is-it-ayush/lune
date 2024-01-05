// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require("expo/metro-config");

// eslint-disable-next-line no-undef
const workspaceRoot = path.resolve(__dirname, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  watchFolders: [workspaceRoot],
  resolver: {
    unstable_enableSymlinks: true,
  },
});

module.exports = config;
