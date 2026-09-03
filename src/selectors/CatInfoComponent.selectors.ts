/**
 * Selectors for `CatInfoComponent`.
 *
 * @public
 * @param selector - The selector for the CatInfoComponent.
 * @returns An object with selector methods for the CatInfoComponent.
 */
export function CatInfoComponentSelectors(selector: string = ":scope") {
    return Object.freeze({
        /**
         * The base selector for the component.
         * @returns The root selector for the component.
         */
        get selector(): string {
            return selector;
        },

        /**
         * The loader container.
         */
        loadingContainer(): string {
            return `${selector} [data-test="cat-info-loading"]`;
        },

        /**
         * The view mode container.
         */
        viewContainer(): string {
            return `${selector} [data-test="cat-info-view"]`;
        },

        /**
         * The edit mode container.
         */
        editContainer(): string {
            return `${selector} [data-test="cat-info-edit"]`;
        },

        /**
         * Input for Cat Name in edit mode.
         */
        nameInput(): string {
            return `${selector} [data-test="edit-name"]`;
        },

        /**
         * Input for Cat Age in edit mode.
         */
        ageInput(): string {
            return `${selector} [data-test="edit-age"]`;
        },

        /**
         * Input for Cat Breed in edit mode.
         */
        breedInput(): string {
            return `${selector} [data-test="edit-breed"]`;
        },

        /**
         * Input for Cat Color in edit mode.
         */
        colorInput(): string {
            return `${selector} [data-test="edit-color"]`;
        },

        /**
         * Input for Favorite Food in edit mode.
         */
        favoriteFoodInput(): string {
            return `${selector} [data-test="edit-favorite-food"]`;
        },
    });
}
