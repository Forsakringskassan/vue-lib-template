/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import { defineConfig } from "@forsakringskassan/vite-lib-config/vite";
import { defineTestConfig } from "@forsakringskassan/vitest-config-jsdom";
import mocks from "./src/mocks.mts";

export default defineConfig({
    test: defineTestConfig(),
    fk: {
        mocks,
    },
});
