# @forsakringskassan/vue-lib-template

En mall för hur ett komponentbibliotek fungerar.

Läs mer i [guide för att skapa komponenter](./project-guide/index.md).

## Dokumentation

Bygg och starta dokumentationen med:

```bash
npm run build
npm run start:docs
```

Dokumentationen kan nås på http://localhost:8080.

Komponenter dokumenteras i `docs/components` katalogen.
Varje komponent ska ha en tillhörande Markdown fil (`.md`) med ett inledande Frontmatter-block:

```md
---
title: Fantastisk komponent
status: Draft
layout: component
component: AwesomeComponent
---
```

Exempel infogas med en code fence:

````md
```import
${filename}
```
````

Vue API dokumentation för komponenter infogas med ett api block:

```md
::: api
vue:${component}
:::
```

Dokumentationen genereras med [`@forsakringskassan/docs-generator`](https://forsakringskassan.github.io/docs-generator/latest/).
