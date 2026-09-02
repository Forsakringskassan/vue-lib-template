/// <reference types="cypress" />

import { configure } from "@forsakringskassan/cypress-config/support";
import "@forsakringskassan/cypress-visual-regression/commands";
import "@forsakringskassan/cypress-axe/support";
import "cypress-html-validate/dist/commands";
import "./commands/forced-colors";

configure({
    afterEach: {
        htmlvalidate: true,
    },
});
