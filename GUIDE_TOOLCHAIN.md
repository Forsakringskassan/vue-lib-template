# 🛠️ Toolchain Cheat Sheet

[⬅️ Back to Index](./GUIDE_INDEX.md)

Here is an overview of all commands in `package.json` and what they actually do.

## 🚀 Development and Execution

| Command              | What happens?                                               | When should I use it?                                                                                                                      |
| :------------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start`          | Starts Vite-dev server (defaults to `src/vite-dev/app.vue`) | When you want to see changes instantly. You can also start a specific example: `npm start CatInfoExample.vue` or just `npm start catinfo`. |
| `npm run build:docs` | Builds the documentation site                               | Must be run first before you can start the docs server.                                                                                    |
| `npm run start:docs` | Starts the documentation site                               | When you are writing documentation or checking API tables.                                                                                 |

## 🧪 Testing and Quality

| Command            | What happens?            | When should I use it?                                |
| :----------------- | :----------------------- | :--------------------------------------------------- |
| `npm run test`     | Runs all tests           | Before you push your code.                           |
| `npm run unit`     | Runs only Vitest tests   | When you are working with the logic in `*-logic.ts`. |
| `npm run lint`     | Checks code quality      | To see if there are any warnings/errors.             |
| `npm run lint:fix` | Fixes simple lint errors | Quick way to clean up the code.                      |

## 📦 Build Process

When you run `npm run build`, several things happen in order:

1. **`build:lib`**: Packages the code into ESM format (for the web).
2. **`build:dts`**: Creates `.d.ts` files so that users of your library get correct autocomplete in VS Code.
3. **`build:api`**: Uses `api-extractor` to analyze your library's public API.
4. **`build:cloneman`**: Prepares the template for future cloning.

**Remember**: If you change something in a component, run `npm run build` to ensure everything still builds without errors.
