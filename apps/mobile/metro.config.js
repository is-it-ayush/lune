/**
Lune
Copyright (C) 2024 ayush.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const monorepoPackages = Object.values({
  "@lune/tsconfig": path.resolve(workspaceRoot, "tooling/typescript-config"),
  "@lune/lint": path.resolve(workspaceRoot, "tooling/eslint-config"),
});

console.log(
  `[metro] ProjectRoot: ${projectRoot} | WorkspaceRoot: ${workspaceRoot}`,
);
console.log(`[metro] Watching:\n${monorepoPackages.join("\n")}`);

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
  // watch for source changes on external packages.
  watchFolders: [projectRoot, ...monorepoPackages],
  resolver: {
    // strictly define where node_modules are and in what order they should be resolved.
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(workspaceRoot, "node_modules"),
    ],
    disableHierarchicalLookup: true,
  },
});

module.exports = withNativeWind(config, { input: "./src/styles/globals.css" });
