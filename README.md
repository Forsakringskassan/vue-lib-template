# fkui/vue

Biblioteket innehåller vue-implementationen av komponenter.

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
- [ ] checklista över vad som ska fungera
    - importera static assets
    - vscode: ska inte visa squiggly lines vid import av static assets
    - vscode: ska inte visa squiggly lines vid cy.mount i komponenttest

## Att göra

- [x] börja med att kopiera alla rotfiler och cypresskatalog etc från designsystem (det vi inte fick med som körs från roten t ex lint osv)
- [ ] docs
- [x] sandbox eller inte
- [ ] stylelint, även på sfc
- [ ] levera css, autoprefixer ska vara med
- [x] trimma allowScripts (jättelåg prio)
- [x] semantic release för vanligt repo
- [ ] uppdatera .gitignore med app.vue
- [ ] pretest: att vara eller att inte vara, det är frågan
- [x] npm start
- [x] npm start AwesomeComponent
- [x] npm test
- [x] npm run build
- [ ] npm run docs
- [ ] npm run serve
