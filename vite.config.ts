import { defineConfig, mergeConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const baseConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
  },
});

const unitConfig = defineConfig({
  test: {
    name: "unit",
    dir: "src/use-cases",
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});

const e2eConfig = defineConfig({
  test: {
    name: "e2e",
    dir: "src/http/controllers",
    environment:
      "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
  },
});

export default mergeConfig(baseConfig, {
  test: {
    projects: [unitConfig, e2eConfig],
  },
});
