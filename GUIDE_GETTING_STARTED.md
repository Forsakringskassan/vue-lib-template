# Getting Started

[⬅️ Back to Index](./GUIDE_INDEX.md)

This guide explains how to create a Vue component library using the `@forsakringskassan/vue-lib-template`.

## Creating the Project with Cloneman

We use a tool called [cloneman](https://github.com/Forsakringskassan/cloneman). Instead of just copying files, cloneman helps you "clone" the template and replace names and references so your new library has the right identity from the start.

1. **Run cloneman** (instructions may vary depending on your local setup, but generally), replacing `<your-project-name>` with the name you want for your new library and `<template-package-name>` with the template you are using:
   `npx cloneman@latest create <your-project-name> <template-package-name>`
2. **Enter the folder**: `cd your-project-name`
3. **Install dependencies**:
    ```bash
    npm install
    ```

### 🔄 Updating your project

Since your project was created with cloneman, you can easily update it to the latest version of the template by running:

```bash
npx cloneman@latest update
```

## Project Structure

Here are the most important locations you need to know:

- `src/`: This is where all your source code lives.
    - `index.ts`: The "Main Entrance". Everything you want others to be able to import from your library must be exported from here.
    - `style.scss`: Global styles for your library.
    - `selectors/`: Contains selector files for Cypress tests, ensuring your tests don't break when CSS classes change.
- `docs/`: This is where you write the documentation.
    - `docs/components/`: Each component gets its own `.md` file here.
- `cypress/`: Settings for your component tests.
- `package.json`: This contains all the "scripts" (commands) you will use to test, build, and document.
- `tsconfig.json`: Configuration for TypeScript, which helps catch errors before you even run your code.

## Local Development

To make sure everything is working, try starting the development environment:

```bash
npm start
```

This starts a local server where you can see your components in real-time.
