/// <reference types="cypress" />

import { configure } from "@forsakringskassan/cypress-config/support";
import "@forsakringskassan/cypress-visual-regression/commands";

configure({
    resetEmulatedMedia: true,
    afterEach: {
        htmlvalidate: true,
    },
});
