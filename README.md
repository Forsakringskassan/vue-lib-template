# @forsakringskassan/vue-lib-template

A standardized template for Vue component libraries, with built-in support for updates.
You are not left on your own after the first scaffold: the template keeps evolving, and your library can follow along.

## Why use this template?

Setting up a component library means choosing and configuring a bundler, test tools, linters, documentation and a release process, and making them work together.
The template has already done this, so you can focus on your components.

Libraries based on it stay up to date, with the same standards, the same structure and the same goodness.

- **Quick start.**
  A working library with a single command.
- **Toolchain included.**
  No need to pick packages, match versions or write the configuration that ties them together.
- **No expertise required.**
  Deliver Vue components without deep toolchain knowledge.
- **Easy to revive.**
  A library catches up with a single update.
- **Consistent.**
  Many libraries can share the same standards and structure.
- **Reference included.**
  An example component shows the recommended way to build, test and document a component.

## Getting started

Projects are created with [Cloneman](https://github.com/Forsakringskassan/cloneman), which creates a project from a template and later helps you update it.
Run:

```bash
npx cloneman@latest create my-component-library @forsakringskassan/vue-lib-template
```

Cloneman asks for the values the template needs, such as the URL to your code repository (or pass them with `--param key=value`).
Then install the dependencies and build:

```bash
cd my-component-library
npm install
npm run build
```

The generated project contains its own [README](./project-guide/index.md) with instructions for daily development, testing, documentation and releases.

## What you get

- Vue 3 component library built with [Vite](https://vite.dev/) and TypeScript, based on FKUI.
- Unit tests with [Vitest](https://vitest.dev/) and component tests with [Cypress](https://www.cypress.io/).
- Linting and formatting with ESLint, Stylelint, HTML-Validate and Prettier.
- Public API tracking with API Extractor.
- Documentation site with live examples, generated with [docs-generator](https://github.com/Forsakringskassan/docs-generator).
- Automated versioning, changelog and publishing with semantic-release.
- Renovate configuration for automated dependency updates.

## Keeping up to date with Cloneman

The template is published as an npm package, and your project is tied to a specific version of it.
When a new version is released, you bring your project up to date with a single command.

1. Run `npx cloneman@latest update` (or `update 1.2.3` for a specific version).
2. Run `npm install`.
3. Review the diff, run the tests and commit.

An update is applied as ordinary changes to your working tree, so you always get a diff to review before committing.
You decide what to take in and what to leave out.

### Updating with Renovate

With [Renovate](https://docs.renovatebot.com/) you get a pull request when a new template version is released.

## License

See [LICENSE.md](./LICENSE.md).
