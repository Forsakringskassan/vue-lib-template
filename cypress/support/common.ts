/// <reference types="cypress" />

import "@forsakringskassan/cypress-visual-regression/commands";
import "@forsakringskassan/cypress-axe/support";
import "cypress-html-validate/dist/commands";
import "./commands/forced-colors";

afterEach(() => {
    cy.htmlvalidate();
});
