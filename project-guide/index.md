# Component library project guide

This guide explains how to develop, test, document, and release this Vue component library.
The documentation in `docs/` describes the library's components, while this guide focuses on the technical aspects of the component library.

## Start here

Read the detailed guides in this order:

- [Development](./development.md) for the available commands and daily workflow.
- [Testing](./testing.md) for Vitest, API mocks, Cypress, and quality checks.
- [Component documentation](./documentation.md) for how to document components and create examples.
- [Commits and releases](./commits-and-releases.md) for collaboration and publication.
- [Cloneman](./cloneman.md) for template-managed files and updates.

## Project Structure

Here are the most important locations you need to know:

- `src/`: This is where all your source code lives.
    - `index.ts`: The "Main Entrance". Everything you want others to be able to import from your library must be exported from here.
    - `style.scss`: Global styles for your library.
    - `components/`: Contains the library's component files.
    - `mocks/`: Contains API mocks and mock-related files for testing.
    - `selectors/`: Contains selector files for Cypress tests, ensuring your tests don't break when CSS classes change.
- `docs/`: This is where you write the documentation.
    - `docs/components/`: Each component gets its own `.md` file here.
- `cypress/`: Settings for your component tests.

## A current reference implementation

The `vue-lib-template` template repository, which this component library is based on, contains a small cat information component that demonstrates the recommended structure. It is useful as a starting point when creating a new component:

- [Component](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/FcCatInfoComponent.vue)
- [Runnable example](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/examples/FcCatInfoComponentExample.vue)
- [Live-example](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/examples/FcCatInfoComponentLiveExample.vue)
- [Unit tests](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/cat-info-logic.spec.ts)
- [Cypress component tests](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/FcCatInfoComponent.cy.ts)
- [Cypress selectors](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/selectors/guide/FcCatInfoComponent.selectors.ts)
- [API mock](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/mocks/guide/cat-api.mock.mts)
- [Mock registration](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/mocks/index.mts)

When comparing your implementation with this example, focus on the separation between rendering, business logic, test selectors, mocks, and examples. The example is just a reference for structure.
