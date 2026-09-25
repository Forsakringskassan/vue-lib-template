/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import path from "node:path";
import {
    type Processor,
    Generator,
    extractMarkdownProcessor,
    frontMatterFileReader,
    manifestProcessor,
    vueFileReader,
} from "@forsakringskassan/docs-generator";
import pkg from "../package.json" with { type: "json" };

function teleportTarget(): Processor {
    return {
        after: "generate-docs",
        name: "fkui:teleport",
        async handler(context) {
            context.addTemplateBlock("body:end", "teleport-target", {
                filename: "partials/teleport.html",
            });
        },
    };
}

const docs = new Generator(import.meta.url, {
    site: { name: pkg.name, lang: "sv" },
    outputFolder: path.resolve(import.meta.dirname, "public"),
    exampleFolders: [path.resolve(import.meta.dirname, "../src")],
    setupPath: path.resolve(import.meta.dirname, "src/setup.ts"),
    templateFolders: ["./templates"],
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
    processors: [
        extractMarkdownProcessor({
            outputFolder: path.join(import.meta.dirname, "../dist/docs"),
        }),
        manifestProcessor(),
        teleportTarget(),
    ],
});

docs.compileScript("main", "./src/main.js", {
    appendTo: "body",
});

docs.compileStyle("main", "./src/main.scss", {
    appendTo: "head",
});

const styleUrl = new URL(import.meta.resolve(`../dist/esm/style.css`));
docs.compileStyle("lib", styleUrl, {
    appendTo: "head",
});

docs.compileScript("#apimock", "./src/bundle-mocks.ts", {
    appendTo: "none",
});

const mswUrl = new URL(import.meta.resolve("msw/mockServiceWorker.js"));
docs.compileWorker("#mock-service-worker", mswUrl);

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
