import { type InstallContext } from "cloneman";

export async function install(context: InstallContext): Promise<void> {
    const { getApplicationName, replaceInFile } = context;
    const scopedName = getApplicationName();

    /* update placeholder names with the real application name (from package.json) */
    const placeholder = /"@forsakringskassan\/vue-lib-template(\/[^"]+)?"/g;
    const quotedName = (_: string, subpath: string | undefined): string => {
        return `"${scopedName}${subpath ?? ""}"`;
    };
    await replaceInFile("cypress/tsconfig.json", placeholder, quotedName);
    await replaceInFile("tsconfig.lib.json", placeholder, quotedName);
    await replaceInFile("tsconfig.cypress.json", placeholder, quotedName);
    await replaceInFile("tsconfig.selectors.json", placeholder, quotedName);
}
