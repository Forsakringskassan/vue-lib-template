/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import { defineConfig } from "@forsakringskassan/vite-lib-config/vite";
import { defineTestConfig } from "@forsakringskassan/vitest-config-jsdom";
import mocks from "./src/mocks/index.mts";

export default defineConfig({
    test: defineTestConfig(),
    fk: {
        mocks,
    },
    optimizeDeps: {
        entries: ["src/**/*.{ts,vue}", "cypress/**/*.{ts,vue}"],
        include: ["@forsakringskassan/vite-lib-config/vue-fallback"],
    },
});
