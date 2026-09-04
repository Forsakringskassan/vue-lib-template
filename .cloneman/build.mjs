import pkg from "../package.json" with { type: "json" };

/**
 * @param {import("cloneman").BuildContext} context
 */
export default async (context) => {
    const { buildTemplate } = context;

    const template = await buildTemplate(pkg.name, {
        managedFiles: [
            ".agents/**",
            ".editorconfig",
            ".gitignore",
            ".htmlvalidate.json",
            ".prettierignore",
            ".vscode/**",
            "api-extractor.lib.json",
            "api-extractor.selectors.json",
            "babel.config.js",
            "cypress/fixtures/example.json",
            "cypress/support/**",
            "cypress/tsconfig.json",
            "cypress/types/**",
            "cypress.config.ts",
            "docs/build.mts",
            "docs/package.json",
            "docs/src/**",
            "docs/tsconfig.json",
            "eslint.config.mjs",
            "Jenkinsfile",
            "LICENSE.md",
            "README.md",
            "renovate.json",
            "tsconfig.cypress.json",
            "tsconfig.json",
            "tsconfig.lib.json",
            "tsconfig.selectors.json",
            "vite.config.mts",
        ],
        ignoredFiles: [
            ".github/**",
            ".npmrc", // does not work internally yet
            "package-lock.json", // consumers are expected to use custom dependencies
        ],
        ignoredDependencies: [
            "@fkui/*",
            "!@fkui/tsconfig",
            "@forsakringskassan/*-api",
            "fk-icons",
        ],
        removeFiles: [
            "api-extractor.json", // split into multiple files
            "index.html", // does not need to use custom template
            "jest.setup.ts", // template uses vitest
            "project.code-workspace", // replaced with .vscode folder
            "tsconfig-consumer.json", // replaced by @fkui/tsconfig
            "vite.config.ts", // replaced by vite.config.mts
        ],
    });

    template.addParameter("repo-url", {
        description: "URL to source repository",
        required: true,
    });

    template.addParameter("docs-repo-url", {
        description: "URL to repository to deploy documentation to",
        defaultValue: "",
        help: "Format: ssh://user@host/project/repo.git",
        required: false,
        pattern: "ssh://.*.git",
    });

    /* install hook to verify application uses the correct template (we cannot put
     * this in the package `prepare` directly as this project is not managed by
     * cloneman and thus fails the check). */
    await template.updateJson("package.json", {
        scripts: {
            prepare: ["cloneman verify", pkg.scripts.prepare].join(" && "),
        },
    });

    /* remove "cloneman build" from the build script, it is used to test the
     * template itself not the user application */
    await template.updateJson("package.json", {
        scripts: {
            build: pkg.scripts.build
                .split(" ")
                .filter((it) => it !== "build:cloneman")
                .join(" "),
            "build:cloneman": undefined,
        },
    });

    /* change the semantic-release preset to the one used by user application
     * instead of publishing cloneman templates */
    await template.updateJson("package.json", {
        release: {
            extends: "@forsakringskassan/semantic-release-config",
        },
    });

    await template.writeFile(
        "CODEOWNERS",
        [
            "# This is a CODEOWNERS file.",
            "# Lines starting with '#' are comments.",
            "# Each line is a file pattern followed by one or more owners.",
            "",
            "# Global owner for the whole repository",
            "#* @username-or-team",
            "",
            "# Example folder-specific owner",
            "#/docs/ @org/doc-team",
        ].join("\n"),
    );

    await template.writeFile("CHANGELOG.md", "");

    await template.renovateIgnoreDependencies();
};
