import AwesomeComponent from "./AwesomeComponent.vue";

describe("AwesomeComponent", () => {
    it("fetches data on button click", () => {
        cy.mount(AwesomeComponent);
        cy.get("button").click();
        cy.get("p.result").should("contain.text", "Hello from backend");
    });
});
