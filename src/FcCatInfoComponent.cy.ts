import { FLoaderSelectors } from "@fkui/vue/selectors";
import FcCatInfoComponent from "./FcCatInfoComponent.vue";
import { cats } from "./cat-data";
import { FcCatInfoComponentSelectors } from "./selectors";

describe("FcCatInfoComponent", () => {
    const testCat = cats[0];
    const catInfoSelectors = FcCatInfoComponentSelectors();
    const loaderSelectors = FLoaderSelectors();

    it("verifies loading text", () => {
        cy.mount(FcCatInfoComponent, {
            props: {
                catId: testCat.id,
            },
        });

        cy.get(catInfoSelectors.loadingContainer()).should("be.visible");
        cy.get(loaderSelectors.waitText()).should(
            "contain.text",
            "Hämtar kattinformation...",
        );
    });

    it("verifies all fields in view mode have correct data", () => {
        cy.mount(FcCatInfoComponent, {
            props: {
                catId: testCat.id,
                isEditable: false,
            },
        });

        // Wait for loading to disappear
        cy.get(catInfoSelectors.loadingContainer()).should("not.exist");

        const view = catInfoSelectors.viewContainer();
        cy.get(view).should("be.visible");

        cy.get(view).contains(testCat.name).should("be.visible");
        cy.get(view).contains(`${testCat.age} år`).should("be.visible");
        cy.get(view).contains(testCat.breed).should("be.visible");
        cy.get(view).contains(testCat.color).should("be.visible");
        cy.get(view).contains(testCat.favoriteFood).should("be.visible");
    });

    it("verifies all fields in edit mode have correct data", () => {
        cy.mount(FcCatInfoComponent, {
            props: {
                catId: testCat.id,
                isEditable: true,
            },
        });

        // Wait for loading to disappear
        cy.get(catInfoSelectors.loadingContainer()).should("not.exist");
        cy.get(catInfoSelectors.editContainer()).should("be.visible");

        cy.get(catInfoSelectors.nameInput())
            .should("be.visible")
            .should("have.value", testCat.name);
        cy.get(catInfoSelectors.ageInput())
            .should("be.visible")
            .should("have.value", testCat.age.toString());
        cy.get(catInfoSelectors.breedInput())
            .should("be.visible")
            .should("have.value", testCat.breed);
        cy.get(catInfoSelectors.colorInput())
            .should("be.visible")
            .should("have.value", testCat.color);
        cy.get(catInfoSelectors.favoriteFoodInput())
            .should("be.visible")
            .should("have.value", testCat.favoriteFood);
    });
});
