import AwesomeComponent from "./AwesomeComponent.vue";

describe("AwesomeComponent", () => {
    it("fetches data on button click", () => {
        // control timers
        cy.clock();
        cy.mount(AwesomeComponent);

        // button should be enabled initially
        cy.get("button").contains("Fetch data").should("not.be.disabled");

        // click to start fetch
        cy.get("button").click();
        // loading state disables button
        cy.get("button").should("have.attr", "aria-disabled", "true");

        // advance fake timer to resolve the simulated backend call
        cy.tick(300);

        // result should be displayed and button re-enabled
        cy.get("p.result").should("contain.text", "Hello from backend");
        cy.get("button").should("have.attr", "aria-disabled", "false");
    });
});
