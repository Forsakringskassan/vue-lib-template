import { type InstallContext } from "cloneman";

export async function install(context: InstallContext): Promise<void> {
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
    const placeholder = /"@forsakringskassan\/vue-lib-template(\/[^"]+)?"/g;
    const quotedName = `"${scopedName}$1"`;
    await replaceInFile("cypress/tsconfig.json", placeholder, quotedName);
    await replaceInFile("tsconfig.lib.json", placeholder, quotedName);
    await replaceInFile("tsconfig.cypress.json", placeholder, quotedName);
    await replaceInFile("tsconfig.selectors.json", placeholder, quotedName);

    /* correct exported subpath "style.css" */
    await updateJsonFile("package.json", {
        exports: {
            "./style.css": `./dist/esm/${unscopedName}.css`,
        },
    });
}
