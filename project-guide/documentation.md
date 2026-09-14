# Component documentation

[← Back to project guide](./index.md)

Component documentation is written in Markdown and generated into the separate site under `docs/`. The repository-level guide you are reading is ordinary README documentation; it is not processed by docs-generator.

The [docs-generator documentation](https://forsakringskassan.github.io/docs-generator/) describes the complete tool. The rules below cover the conventions needed for a component page.

## Create the Markdown page

Put the component page in `docs/components/` and give it the same base name as the component. Start with the required front matter:

```md
---
title: Cat information
status: Draft
layout: component
component: FcCatInfoComponent
---
```

Use `Experimentell`, `Draft`, or `Produktionsklar` for `status`, according to the component's actual maturity. The title from front matter becomes the page heading, so do not add a separate `#` heading. Start the body with a short preamble explaining what the component does and when to use it.

## Add an example first

Every component must have at least one runnable example so readers can see the component in a useful state. Put examples in `src/`, where the documentation build is configured to find Vue files.

A standard runnable example is included with an `import` fence:

````md
```import
CatInfoExample.vue
```
````

The corresponding example is [`FcCatInfoComponentExample.vue`](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/examples/FcCatInfoComponentExample.vue). Keep the example focused on a realistic use case and make its initial state useful without extra setup.

Prefer a live example when the documentation needs interactive controls or a richer demonstration. Include a file ending in `LiveExample.vue` with the `live-example` variant:

````md
```import live-example
FcCatInfoComponentLiveExample.vue
```
````

The reference implementation shows this pattern in [FcCatInfoComponentLiveExample.vue](https://github.com/Forsakringskassan/vue-lib-template/blob/main/src/components/guide/FcCatInfo/examples/FcCatInfoComponentLiveExample.vue) and its [documentation page](https://github.com/Forsakringskassan/vue-lib-template/blob/main/docs/guide/index.md).

See the [docs-live-example README](https://github.com/Forsakringskassan/docs-live-example/blob/main/README.md) for the implementation details behind interactive examples.

A runnable example is part of the documentation contract, not optional decoration. Add at least one for every component and verify it through `npm run build:docs` and the local documentation server.

## Explain usage and constraints

After the preamble and example, use level-two headings for the content readers need. Typical sections are:

- When to use the component.
- Important states and behavior.
- Content and accessibility considerations.
- Do's and don'ts.
- API.

Only include sections that apply. Keep guidance task-oriented and describe what a consumer should do, not how the component happens to be implemented.

## Include the generated API

Add the Vue API block for every component page:

```md
## API

::: api
vue:FcCatInfoComponent
:::
```

The component name must match the Vue component passed to the generator. Public props, events, slots, and documented types are extracted from the component source and its declarations. Keep public API comments accurate because they are part of the generated documentation.

If the component has translation keys, add the corresponding translation API block. Do not add empty sections for features the component does not use.
