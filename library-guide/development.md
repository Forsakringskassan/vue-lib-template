# Development

[← Back to library guide](./index.md)

To get up and running quickly:

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm start`
3. **Run a specific example**: `npm start <name>` (e.g., `npm start my-component`)
4. **Run tests**: `npm test`

## Implementation Flow

1. **Create the component**: Create `my-component.vue`.
2. **Export**: Open `src/components/index.ts` and add:

    ```typescript
    export { default as FcMyComponent } from "./my-component.vue";
    ```

## Styling

- For small amounts of styling, it is perfectly fine to use `<style lang="scss"></style>` directly within the `.vue` file.
- For more extensive styles, create a dedicated SCSS file for the component (e.g., `my-component.scss`) and import it in the `.vue` file.
- Use `style.scss` for styles that should apply to the entire library.

## Common commands

Use the repository scripts from the root of the project unless stated otherwise.
The most important commands for daily development are marked in **bold**.

| Command                  | Use it for                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| **`npm start`**          | Start the Vite development server using `src/vite-dev/app.vue`.                             |
| **`npm run build`**      | Build the library, declaration files, API reports, documentation and the Cloneman template. |
| `npm run build:lib`      | Build the distributable JavaScript and CSS library bundle.                                  |
| `npm run build:dts`      | Check and emit TypeScript declaration files.                                                |
| `npm run build:api`      | Update API Extractor reports for the public package surface.                                |
| **`npm run start:docs`** | Serve the generated documentation site locally at `http://localhost:8080`.                  |
| **`npm test`**           | Run Vitest                                                                                  |
| **`npm run unit`**       | Run Vitest without coverage for a quick unit-test loop.                                     |
| **`npm run lint`**       | Run Prettier, ESLint, Stylelint, and HTML validation checks.                                |
| **`npm run lint:fix`**   | Apply available automatic formatting and lint fixes, then review the resulting diff.        |
| `npm run prettier:check` | Check formatting without changing files.                                                    |
| `npm run prettier:write` | Format supported files.                                                                     |
| `npm run eslint`         | Run ESLint with its cache.                                                                  |
| `npm run stylelint`      | Check styles in `src/**/*.css` and `src/**/*.scss`.                                         |
| `npm run html-validate`  | Validate HTML, Vue files, and Markdown examples.                                            |
| `npm run clean`          | Remove generated `dist/` and `temp/` files.                                                 |

## Running examples

You can run a specific example file directly by passing a name to the start command:

```bash
npm start my-component
```

This uses fuzzy search to find and start the best matching file in `examples`-folders (e.g., `my-component-example.vue`).

## Documentation commands

Documentation is maintained in `docs/` and generated with [`@forsakringskassan/docs-generator`](https://forsakringskassan.github.io/docs-generator/latest/).
A typical local workflow is:

```bash
npm run build
npm run start:docs
```

The generated site is build output.
Edit Markdown and Vue examples in the source locations, then build again.
