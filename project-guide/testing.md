# Testing and quality checks

[← Back to project guide](./index.md)

Use different tools for different questions. Unit tests check isolated logic quickly. Cypress checks the component as a user experiences it. API mocks make examples and browser tests deterministic without requiring a live backend.

## Vitest unit tests

Use Vitest for composables, business rules, data transformations. Keep these tests independent from the browser whenever possible.

Run tests with `npm run unit`.

The cat information logic is tested in [`cat-info-logic.spec.ts`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/cat-info-logic.spec.ts). It mocks the API module and verifies loading, successful data, errors, and updates:

```ts
import { expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";
import { useCatInfo } from "./cat-info-logic";

vi.mock("./cat-api");

it("loads a cat", async () => {
    vi.mocked(catGetById).mockResolvedValue({ id: "cat-001", name: "Milo" });

    const { cat, fetchCat } = useCatInfo();
    await fetchCat("cat-001");

    expect(cat.value?.name).toBe("Milo");
});
```

## API mocks with apimock-express

Prefer [@forsakringskassan/apimock-express](https://github.com/Forsakringskassan/apimock-express) when a component calls an HTTP API. A mock documents the endpoint contract and lets the documentation site and Cypress use the same predictable response.

Prefer inline mocks when the mock is only needed by a single test or example. See the [inline mocks documentation](https://github.com/Forsakringskassan/apimock-express#inline-mocks) for details.

The local example is [`cat-api.mock.mts`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/mocks/guide/cat-api.mock.mts):

```ts
import { defineMock } from "@forsakringskassan/apimock-express/helpers";

export default defineMock<ResponseType>({
    meta: {
        url: "/resource",
        method: "GET",
    },
    defaultResponse(params) {
        const id = params.parameters?.id;

        return {
            status: 200,
            body: createResponse(id),
            delay: 300,
        };
    },
});
```

To add a new mock:

1. Create a `*.mock.mts` file next to the API code.
2. Define its HTTP method, URL, response type, status, body, and any useful delay.
3. Import it in [`src/mocks/index.mts`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/mocks/index.mts).
4. Add it to the array passed to `appendBasePath`.
5. Use the mock from examples and browser tests, and cover error responses as well as success.

Mocks are valuable because they make failures reproducible, keep tests independent of external environments, and expose API assumptions early. Keep mock data representative but small, and do not use real personal or production data.

See the [apimock-express README](https://github.com/Forsakringskassan/apimock-express/blob/main/README.md) for advanced request matching and response configuration.

## Cypress component tests

Use Cypress for user-visible component behavior: rendering, loading states, form interaction, emitted actions, error states, and accessibility-related behavior. The current example is [`FcCatInfoComponent.cy.ts`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/FcCatInfoComponent.cy.ts).

The current package does not define a dedicated Cypress npm script, so run Cypress through `npx`:

- **Interactive runner** (for development): `npx cypress open --component`
- **CLI runner** (for CI checks): `npx cypress run --component`

Mount the component with realistic props and wait for state changes through visible behavior:

```ts
cy.mount(FcCatInfoComponent, {
    props: {
        catId: testCat.id,
        isEditable: false,
    },
});

cy.get(catInfoSelectors.loadingContainer()).should("not.exist");
cy.get(catInfoSelectors.viewContainer()).should("be.visible");
```

Do not use arbitrary timeouts to wait for the API. Assert on a loading element, a success element, or an error message instead.

### Selectors

Keep reusable selectors in a `selectors/` file instead of scattering CSS selectors through specs. The [`FcCatInfoComponent` selector helper](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/selectors/guide/FcCatInfoComponent.selectors.ts) uses [`data-test`](https://designsystem.forsakringskassan.se/latest/functions/plugins/testplugin.html) attributes and supports scoping a component instance.

Selectors should describe stable test targets.

### Accessibility and HTML validation

The Cypress configuration includes accessibility and HTML validation plugins. Treat their failures as product issues: fix the component markup or semantics rather than weakening the test by default.

Read the [FKDS test tools guide](https://forsakringskassan.github.io/designsystem/latest/gettingstarted/contribute-to-fkds/testverktyg.html) for the wider testing conventions used by the design system.

## Linting and formatting

Linting ensures a consistent coding style across the project, catches common bugs early, and reduces noise in git diffs by enforcing a uniform format. Run `npm run lint` regularly during development and always before opening a pull request. It combines:

- Prettier for consistent formatting.
- ESLint for JavaScript, TypeScript, Vue, Vitest, and Cypress rules.
- Stylelint for CSS and SCSS.
- HTML Validate for HTML, Vue templates, and Markdown examples.

Use `npm run lint:fix` for mechanical fixes, then inspect the diff and run the checks again. Do not disable a rule merely to make a test or example pass; understand why the rule exists first.
