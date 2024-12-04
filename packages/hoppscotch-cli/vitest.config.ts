import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./setupFiles.ts"],
    // og test include: ["**/src/__tests__/**/**/*.{test,spec}.ts"],
    include: ["**/src/__tests__/functions/**/*.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      // this is the thing we are testing  -> "**/src/__tests__/functions/**/*.ts",
    ],
  },
});
