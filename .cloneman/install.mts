import { type InstallContext } from "cloneman";

export async function install(context: InstallContext): Promise<void> {
    const { updateJsonFile, getApplicationName, replaceInFile } = context;
    const scopedName = getApplicationName();
    const unscopedName = getApplicationName({ unscoped: true });

    /* update placeholder names with the real application name (from package.json) */
    const placeholder = /"@forsakringskassan\/vue-lib-template(\/[^"]+)?"/g;
    const quotedName = (_: string, subpath: string): string => {
        return `"${scopedName}${subpath}"`;
    };
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
