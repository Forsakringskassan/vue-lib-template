import { FLoaderSelectors } from "@fkui/vue/selectors";
import CatInfoComponent from "./CatInfoComponent.vue";
import { cats } from "./cat-data";
import { CatInfoComponentSelectors } from "./selectors";

describe("CatInfoComponent", () => {
    const testCat = cats[0];
    const catInfoSelectors = CatInfoComponentSelectors();
    const loaderSelectors = FLoaderSelectors();

    it("verifies loading text", () => {
        cy.mount(CatInfoComponent, {
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
        cy.mount(CatInfoComponent, {
            props: {
                catId: testCat.id,
                isEditable: false,
            },
        });

        // Wait for loading to disappear
        cy.get(catInfoSelectors.loadingContainer()).should("not.exist");
        cy.get(catInfoSelectors.viewContainer()).should("be.visible");

        cy.contains(testCat.name).should("be.visible");
        cy.contains(`${testCat.age} år`).should("be.visible");
        cy.contains(testCat.breed).should("be.visible");
        cy.contains(testCat.color).should("be.visible");
        cy.contains(testCat.favoriteFood).should("be.visible");
    });

    it("verifies all fields in edit mode have correct data", () => {
        cy.mount(CatInfoComponent, {
            props: {
                catId: testCat.id,
                isEditable: true,
            },
        });

        // Wait for loading to disappear
        cy.get(catInfoSelectors.loadingContainer()).should("not.exist");
        cy.get(catInfoSelectors.editContainer()).should("be.visible");

        cy.get(catInfoSelectors.nameInput()).should("have.value", testCat.name);
        cy.get(catInfoSelectors.ageInput()).should(
            "have.value",
            testCat.age.toString(),
        );
        cy.get(catInfoSelectors.breedInput()).should(
            "have.value",
            testCat.breed,
        );
        cy.get(catInfoSelectors.colorInput()).should(
            "have.value",
            testCat.color,
        );
        cy.get(catInfoSelectors.favoriteFoodInput()).should(
            "have.value",
            testCat.favoriteFood,
        );
    });
});
