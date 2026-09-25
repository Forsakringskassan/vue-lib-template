# Development

[← Back to project guide](./index.md)

To get up and running quickly:

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm start`
3. **Run a specific example**: `npm start <name>` (e.g., `npm start catinfo`)
4. **Run tests**: `npm test`

## Architecture: Three Layers

We recommend separating Appearance, Logic, and Types into three distinct layers to keep the codebase maintainable. You can find an example component, [`FcCatInfoComponent`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/FcCatInfoComponent.vue), which demonstrates how this structure can be applied in practice:

### 1. Type Layer

In the example [cat-types.ts](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/cat-types.ts), we define _what_ the data is using TypeScript interfaces.

- **Why?** It ensures that both the logic and the component know exactly which fields (e.g., `name`, `age`) exist.

### 2. Logic Layer

In the example [cat-info-logic.ts](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/cat-info-logic.ts), we create a so-called "composable" (a function that starts with `use...`, e.g., `useCatInfo`).

- This is where we handle API calls, state (loading, error), and calculations.
- **Why?** It makes the logic easy to test with Vitest without needing to start a full browser.

### 3. UI Layer

Refer to [FcCatInfoComponent.vue](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/FcCatInfoComponent.vue) for the actual Vue component. This should be "thin".

- It imports the logic from `useCatInfo`.
- It uses components from `@fkui/vue` (such as `FCard` or `FLoader`) to follow the design system.
- **Focus**: The UI layer should only care about _how to display_ the data and _which user actions_ to trigger. The "brain" is in the logic layer.

## Implementation Flow

1. **Create the files**: Create `MyComponent.vue`, `my-component-logic.ts`, and `my-component-types.ts`.
2. **Implement logic**: Create your `useMyComponent` function and export it.
3. **Build UI**: Import the logic into the `.vue` file and connect variables to the template.
4. **Export**: Open `src/components/index.ts` and add:

    ```typescript
    export { default as MyComponent } from "./MyComponent.vue";
    ```

## Styling

- For small amounts of styling, it is perfectly fine to use `<style lang="scss"></style>` directly within the `.vue` file.
- For more extensive styles, create a dedicated SCSS file for the component (e.g., `MyComponent.scss`) and import it in the `.vue` file.
- Use `style.scss` for styles that should apply to the entire library.

## Common commands

Use the repository scripts from the root of the project unless stated otherwise. The most important commands for daily development are marked in **bold**.

| Command                  | Use it for                                                                      |
| ------------------------ | ------------------------------------------------------------------------------- |
| **`npm start`**          | Start the Vite development server using `src/vite-dev/app.vue`.                 |
| **`npm run build`**      | Build the library, declaration files, API reports, and the Cloneman template.   |
| `npm run build:lib`      | Build the distributable JavaScript and CSS library bundle.                      |
| `npm run build:dts`      | Check and emit TypeScript declaration files.                                    |
| `npm run build:api`      | Update API Extractor reports for the public package surface.                    |
| **`npm run build:docs`** | Build the documentation site into `docs/public/`.                               |
| **`npm run start:docs`** | Serve the generated documentation site locally at `http://localhost:8080`.      |
| **`npm test`**           | Run the full test command, including the configured pre-test checks.            |
| **`npm run unit`**       | Run Vitest without coverage. Useful for a quick unit-test loop.                 |
| **`npm run lint`**       | Run Prettier, ESLint, Stylelint, and HTML validation checks.                    |
| **`npm run lint:fix`**   | Apply available automatic formatting and lint fixes. Review the resulting diff. |
| `npm run prettier:check` | Check formatting without changing files.                                        |
| `npm run prettier:write` | Format supported files.                                                         |
| `npm run eslint`         | Run ESLint with its cache.                                                      |
| `npm run stylelint`      | Check styles in `src/**/*.css` and `src/**/*.scss`.                             |
| `npm run html-validate`  | Validate HTML, Vue files, and Markdown examples.                                |
| `npm run clean`          | Remove generated `dist/` and `temp/` files.                                     |

## Running examples

You can run a specific example file directly by passing a name to the start command:

```bash
npm start catinfo
```

This uses fuzzy search to find and start the best matching file in `src/examples/` (e.g., `CatInfoExample.vue`).

## API URL configuration

The cat example reads its endpoint from the Vite environment variable `VITE_CAT_API_URL`.
Development uses `.env.development` with the local mock endpoint:

```bash
VITE_CAT_API_URL=/api/cat
```

Production uses `.env.production` with the production endpoint:

```bash
VITE_CAT_API_URL=/prod/rest/api/cat
```

Vite selects the file based on the current mode. Restart the development server after changing an env file, and rebuild after changing the production value.

## Documentation commands

Documentation is maintained in `docs/` and generated with [`@forsakringskassan/docs-generator`](https://forsakringskassan.github.io/docs-generator/latest/). A typical local workflow is:

```bash
npm run build:docs
npm run start:docs
```

The generated site is build output. Edit Markdown and Vue examples in the source locations, then build again.
