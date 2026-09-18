/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import { copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
    Generator,
    frontMatterFileReader,
    vueFileReader,
} from "@forsakringskassan/docs-generator";
import pkg from "../package.json" with { type: "json" };

const docs = new Generator(import.meta.url, {
    site: { name: pkg.name, lang: "sv" },
    outputFolder: path.resolve(import.meta.dirname, "public"),
    exampleFolders: [path.resolve(import.meta.dirname, "../src")],
    setupPath: path.resolve(import.meta.dirname, "src/setup.ts"),
    vendor: [
        { package: "vue", alias: "vue/dist/vue.esm-bundler.js" },
        {
            package: pkg.name,
            alias: path.join(import.meta.dirname, "../dist/esm/index.esm.js"),
        },
        "@fkui/date",
        "@fkui/logic",
        "@fkui/vue",
    ],
});

docs.compileScript("main", "./src/main.js", {
    appendTo: "body",
});

docs.compileStyle("main", "./src/main.scss", {
    appendTo: "head",
});

const styleUrl = import.meta.resolve(`../dist/esm/style.css`);
const stylePath = fileURLToPath(styleUrl); // workaround for https://github.com/Forsakringskassan/docs-generator/issues/499
docs.compileStyle("lib", stylePath, {
    appendTo: "head",
});

docs.compileScript("mocks", "./src/bundle-mocks.mjs", {
    appendTo: "head",
});

await docs.build([
    {
        include: ["**/*.md"],
        exclude: ["**/node_modules/**"],
        fileReader: frontMatterFileReader,
    },
    {
        include: ["../src/**/*.vue"],
        fileReader: vueFileReader,
    },
]);

copyFileSync(
    "../node_modules/msw/lib/mockServiceWorker.js",
    "./public/mock-service-worker.js",
);
