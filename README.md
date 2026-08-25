# @forsakringskassan/vue-lib-template

En mall för hur ett komponentbibliotek fungerar.

## Dokumentation

Bygg och starta dokumentationen med:

```bash
npm run build:docs
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

## Att dokumentera

- [ ] ingress
- [ ] quick start: de vanliga kommandon man behöver
- [ ] lintning och statisk kodanalys
    - vilka verktyg körs och varför
    - förklara html-validate och no-unknown-elements
- [ ] förklara varför vi använder api-extractor/värde | public internal | dts-fil
- [ ] förstå vad paketet levererar
- [ ] så här kör du cypress
- [ ] bundling och inte bundling, hur gör jag
- [ ] hur dokumenterar man komponenter?
- [x] hur bygger man dokumentationen?
- [x] hur startar man dokumentationen?
- [ ] checklista över vad som ska fungera
    - importera static assets
    - vscode: ska inte visa squiggly lines vid import av static assets
    - vscode: ska inte visa squiggly lines vid cy.mount i komponenttest

## Att göra

- [x] börja med att kopiera alla rotfiler och cypresskatalog etc från designsystem (det vi inte fick med som körs från roten t ex lint osv)
- [x] docs
- [x] sandbox eller inte
- [ ] stylelint, även på sfc
- [x] levera css
- [ ] postcss med autoprefixer ska köras
- [x] trimma allowScripts (jättelåg prio)
- [x] semantic release för vanligt repo
- [ ] uppdatera .gitignore med app.vue
- [ ] pretest: att vara eller att inte vara, det är frågan
- [x] npm start
- [x] npm start AwesomeComponent
- [x] npm test
- [x] npm run build
- [x] npm run build:docs
- [x] npm run start:docs
- [ ] apimock
- [ ] bättre exempelkomponent
- [ ] bättre enhetstest
- [ ] bättre komponenttest
- [ ] live exempel
- [ ] skill för att skapa live exempel
