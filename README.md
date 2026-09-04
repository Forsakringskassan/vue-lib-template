# @forsakringskassan/vue-lib-template

A template for Vue component libraries.

The template is managed with [Cloneman](https://github.com/Forsakringskassan/cloneman), a tool for creating and updating projects based on a shared template.

## Getting started

Create a new repository and navigate to the directory where it was cloned, then run:

```bash
npx cloneman@latest create @forsakringskassan/vue-lib-template
npm install
```

The `create` command takes the name of the template (`@forsakringskassan/vue-lib-template`) as its argument. The template will ask for the name of the application and whether there is an associated documentation repository.

Start a local development server at http://localhost:8080 with `npm start`.'
Open it in a browser to view the components live.

See [Cloneman's documentation](https://github.com/Forsakringskassan/cloneman#usage-for-consumers) for more details, such as how to target a specific version of the template.

Make a first commit by staging all files and enter a commit message following
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

```bash
git add --all
git commit -m "chore: initial commit based on @forsakringskassan/vue-lib-template"
git push
```

When it is time for the first release, the commit messages are looked at to determine what version to bump to semantically (and to update the changelog).

### Updating from the template

When the template is updated, the application can be updated to the latest version with:

```bash
npx cloneman@latest update
```

Then run `npm install` to install any new dependencies. See [Cloneman's documentation](https://github.com/Forsakringskassan/cloneman#update-your-application) for more information, including how to update to a specific version.

#### Renovate

The template (`@forsakringskassan/vue-lib-template`) is itself a dependency monitored by Renovate, which creates update PRs for it if Renovate is used. However, many of the other dependencies used by the template are ignored by Renovate in the application because they are instead updated by running `npx cloneman@latest update` against a new version of the template.

## Documentation

Build and start the documentation with:

```bash
npm run build:docs
npm run start:docs
```

The documentation is available at http://localhost:8080.

Components are documented in the `docs/components` directory.
Each component should have an associated Markdown file (`.md`) with an initial Frontmatter block:

```md
---
title: Fantastisk komponent
status: Draft
layout: component
component: AwesomeComponent
---
```

Examples are included with a code fence:

````md
```import
${filename}
```
````

Vue API documentation for components is included with an API block:

```md
::: api
vue:${component}
:::
```

The documentation is generated with [`@forsakringskassan/docs-generator`](https://forsakringskassan.github.io/docs-generator/latest/).

## Documentation to add

- [ ] introduction
- [ ] quick start: the common commands you need
- [ ] linting and static code analysis
    - which tools are run and why
    - explain html-validate and no-unknown-elements
- [ ] explain why we use api-extractor/value | public internal | dts file
- [ ] understand what the package delivers
- [ ] how to run Cypress
- [ ] bundling and not bundling, how do I do it?
- [ ] how to document components
- [x] hur bygger man dokumentationen?
- [x] how to start the documentation
- [ ] checklista över vad som ska fungera
    - import static assets
    - VS Code should not show squiggly lines when importing static assets
    - VS Code should not show squiggly lines for cy.mount in component tests

## To do

- [x] start by copying all root files, the Cypress directory, etc. from the design system (things that were not included but run from the root, such as linting)
- [x] docs
- [x] sandbox or not
- [ ] Stylelint, including SFCs
- [x] deliver CSS
- [ ] PostCSS with Autoprefixer should be run
- [x] trim allowScripts (very low priority)
- [x] Semantic Release for a regular repository
- [ ] update .gitignore with app.vue
- [ ] pretest: to be or not to be, that is the question
- [x] npm start
- [x] npm start AwesomeComponent
- [x] npm test
- [x] npm run build
- [x] npm run build:docs
- [x] npm run start:docs
- [ ] API mock
- [ ] better example component
- [ ] better unit test
- [ ] better component test
- [ ] live examples
- [ ] skill for creating live examples
