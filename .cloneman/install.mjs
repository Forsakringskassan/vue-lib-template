/**
 * @param {import("cloneman").InstallContext} context
 */
export default async (context) => {
    const { getParameter, updateJsonFile, getApplicationName, replaceInFile } =
        context;

    /* write repository url to "package.json" */
    const repoUrl = getParameter("repo-url");
    await updateJsonFile("package.json", {
        repository: {
            type: "git",
            url: repoUrl,
        },
    });

    /* update placeholder names with the real application name (from package.json) */
    const name = getApplicationName;
    const placeholder = "@forsakringskassan/vue-lib-template";
    await replaceInFile("tsconfig.lib.json", placeholder, name);
    await replaceInFile("tsconfig.cypress.json", placeholder, name);
    await replaceInFile("tsconfig.selectors.json", placeholder, name);
};
