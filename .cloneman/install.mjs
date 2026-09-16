/**
 * @param {import("cloneman").InstallContext} context
 */
export default async (context) => {
    const { getParameter, updateJsonFile, getApplicationName, replaceInFile } =
        context;
    const scopedName = getApplicationName();
    const unscopedName = getApplicationName({ unscoped: true });

    /* write repository url to "package.json" */
    const repoUrl = getParameter("repo-url");
    await updateJsonFile("package.json", {
        repository: {
            type: "git",
            url: repoUrl,
        },
    });

    /* update placeholder names with the real application name (from package.json) */
    const placeholder = "@forsakringskassan/vue-lib-template";
    await replaceInFile("tsconfig.lib.json", placeholder, scopedName);
    await replaceInFile("tsconfig.cypress.json", placeholder, scopedName);
    await replaceInFile("tsconfig.selectors.json", placeholder, scopedName);

    /* correct exported subpath "style.css" */
    await updateJsonFile("package.json", {
        exports: {
            "./style.css": `./dist/esm/${unscopedName}.css`,
        },
    });
};
