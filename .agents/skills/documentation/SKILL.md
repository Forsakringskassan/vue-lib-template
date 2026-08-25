---
name: documentation
description: Write component documentation.
---

Documentation in this repository uses [`@forsakringskassan/docs-generator`](https://forsakringskassan.github.io/docs-generator/latest/) (source: https://github.com/forsakringskassan/docs-generator) to generate a documentation site.
When in doubt, you may consult the linked site to find the documentation of the tool itself.

The `docs/` folder holds:

- Build scripts (`docs/build.mts`).
- Site sourcecode (`docs/src/`).
- Markdown content.

After building the contents are available in the `public/` folder.
Files are 1:1 mapped between the `docs/` and `public/` folder, e.g. `docs/components/foo.md` generates `public/components/foo.html`.

## Commands

- `npm run -w docs build` - Build documentation.
- `npm start -w docs` - Start a webserver hosting the documentation at `http://localhost:8080/`.

If available, use the Chrome Devtools MCP server to access the site.

## Writing documentation

Component documentation is written in Markdown format (`.md`) in the `docs/components` folder.
Each component should have an associated Markdown file with the same name as the component (e.g. `AwesomeComponent.vue` should have the `AwesomeComponent.md` file).
Unless instructed otherwise, use Swedish language when writing content.
Markdown files should be formatted with Prettier.

Use [`template.md`](./template.md) as a template.

The Frontmatter block contains the properties:

- `title` - the document title, should be a human readable name of the component
- `status` - component status, use `Experimental`, `Draft` or `Produktionsklar` only. If unsure which one to use, ask for clarification.
- `layout` - must be set to `component` for component documentation.
- `component` - name of the Vue component.

It may optionally contain these properties:

- `short-title` - a shorter `title` used in the navigation, use this when the regular title is long and/or causes the layout to overflow.
- `search.terms` - an array of optional keywords the search function should index for this page.

There should not be an h1 heading in the document, it is injected automatically from the `title` property.
After the preamble and example, start using h2 headings.

Remove sections not relevant to the component, e.g. if it does not have translatable text skip the "Textnycklar" section.

## Examples

Each component documentation should have an example after the preamble.
Prefer "live examples" over regular runnable examples.

If the component has a "live example", a file with the `LiveExample.vue` suffix, include it with an `import` code fence:

````md
```import live-example
FilenameLiveExample.vue
```
````

If a live example is not present but the component instead have regular example files, files with the `Example.vue` suffix, include it with an `import` code fence:

````md
```import
FilenameExample.vue
```
````

If there are no examples, ask for clarification what to do.
If multiple examples (live examples or regular), ask for clarification which file should be included.

## API

Each component should include the API section and the special `api` container:

```md
::: api
vue:ComponentName
:::
```

This will insert the generated API documentation for the Vue component with the matching name.

## Grouping related components

A set of related components may optionally be grouped in a subfolder.

```
example-group
├── AnotherComponent.md
├── AwesomeComponent.md
└── index.json
```

Each group must have an `index.json` containing the group title (human readable):

```json
{
    "title": "Example group"
}
```

## Moving files

If a Markdown file is being moved, the Frontmatter block of the file must add the `redirect_from` property:

```
---
title: Fantastisk komponent
redirect_from:
    - old/old-page.html
```

The property is an array of old paths (relative to the `public/` folder).
If the property already exists, add more entries.
