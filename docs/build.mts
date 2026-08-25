import path from "node:path";
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
        "@fkui/vue",
    ],
});

docs.compileStyle("main", "./src/main.scss", {
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
