# Documentation and Examples

[⬅️ Back to Index](./GUIDE_INDEX.md)

An automated pipeline is used to generate the documentation site.

## Writing Documentation

Each component requires a Markdown file in `docs/components/` with the following frontmatter:

```md
---
title: My Awesome Component
status: Draft
layout: component
component: MyComponent
---
```

**Pro Tip**: The `component: MyComponent` field must match the name of the component exported in `src/index.ts` exactly, otherwise the API tables and live examples won't work.

## Features

### 1. API Tables

API tables for Props and Events are generated automatically. Use this block:

```md
::: api
vue:MyComponent
:::
```

`docs-generator` then reads your `.vue` file and creates the table automatically!

### 2. Live Examples

To show the component "live", we use `docs-live-example`. You create a small example file (e.g., in `src/examples/`) and link it in your `.md` file:

````md
```import live-example
MyComponentLiveExample.vue
```
````

````

## 🌐 See the Result
First, you need to build the documentation:
```bash
npm run build:docs
```

Then, run the following command to start the documentation server:
```bash
npm run start:docs
````

Then go to `http://localhost:8080`.
