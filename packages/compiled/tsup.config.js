import { defineConfig } from "tsup";
import { exec } from "node:child_process";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  splitting: false,
  treeshake: true,
  clean: true,
  outDir: "dist",
  onSuccess: async () => {
    exec("tsc --emitDeclarationOnly");
  },
  ...options,
}));
