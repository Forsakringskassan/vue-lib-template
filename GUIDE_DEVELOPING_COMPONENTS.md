# Developing Components

[⬅️ Back to Index](./GUIDE_INDEX.md)

We separate Appearance, Logic, and Types to keep the codebase maintainable. `FcCatInfoComponent` is used as the primary example.

## Architecture: Three Layers

The code is split into three distinct layers:

### 1. Type Layer (`cat-types.ts`)

Here we define _what_ the data is. We use TypeScript interfaces.

- **Why?** It ensures that both the logic and the component know exactly which fields (e.g., `name`, `age`) exist.

### 2. Logic Layer (`cat-info-logic.ts`)

Here we create a so-called "composable" (a function that starts with `use...`, e.g., `useCatInfo`).

- This is where we handle API calls, state (loading, error), and calculations.
- **Why?** It makes the logic easy to test with Vitest without needing to start a full browser.

### 3. UI Layer (`FcCatInfoComponent.vue`)

The actual Vue component. This should be "thin".

- It imports the logic from `useCatInfo`.
- It uses components from `@fkui/vue` (such as `FCard` or `FLoader`) to follow the design system.
- **Focus**: The UI layer should only care about _how to display_ the data and _which user actions_ to trigger. The "brain" is in the logic layer.

## Implementation Flow

1. **Create the files**: Create `MyComponent.vue`, `my-component-logic.ts`, and `my-component-types.ts`.
2. **Implement logic**: Create your `useMyComponent` function and export it.
3. **Build UI**: Import the logic into the `.vue` file and connect variables to the template.
4. **Export**: Open `src/index.ts` and add:
    ```typescript
    export { default as MyComponent } from "./MyComponent.vue";
    ```

## 🎨 Styling

- Use `local.scss` for styles that only apply to your specific component.
- Use `style.scss` for styles that should apply to the entire library.
