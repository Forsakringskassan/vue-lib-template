/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import { configure } from "@forsakringskassan/cypress-config/support";
import "@forsakringskassan/cypress-visual-regression/commands";

await configure({
    resetEmulatedMedia: true,
    afterEach: {
        htmlvalidate: true,
    },
});
