# Testing and Quality

[⬅️ Back to Index](./GUIDE_INDEX.md)

Testing is performed at two levels: Logic and UI.

## Unit Tests with Vitest (Logic)

Every logic file (`*-logic.ts`) has a corresponding test file (`*.spec.ts`).

Take a look at `CatInfoLogic.spec.ts`:

- We use `vi.mock` to simulate API responses. We don't want to call a real API during a unit test.
- We test "happy paths" (data is fetched correctly) and "error paths" (the API returns an error).

**Run the tests**:

```bash
npm run unit
```

## Component Tests with Cypress (UI)

These tests verify that the component renders correctly and responds to user interaction.

Take a look at `FcCatInfoComponent.cy.ts`:

- We use `cy.mount(FcCatInfoComponent, { props: { ... } })` to render the component in a test environment.
- **Selectors**: We do not use CSS classes to find elements (because they can change), but instead use specific "selectors" (see `src/selectors/`).
- **Example**: Instead of `cy.get('.btn-submit')`, we use `cy.get(selectors.submitButton())`. This makes your tests much more stable.

**Run the tests**:
Run `npm run cypress:open` (or the corresponding script) to open the Cypress test runner.

## Code Quality (Linting)

We use the following tools to automate code quality checks:

- **ESLint**: Finds logical errors in TS/JS.
- **Stylelint**: Finds errors in CSS/SCSS.
- **html-validate**: Checks that your HTML/Vue template is correct.

**Quick Fix**: If you see many red squiggly lines in VS Code, try:

```bash
npm run lint:fix
```
