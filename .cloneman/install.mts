import { type InstallContext } from "cloneman";

async function enableDeployDocs(context: InstallContext): Promise<void> {
    const { getParameter, replaceInFile } = context;
    const url = getParameter("docs-repo-url");
    if (url === "") {
        return;
    }
    await replaceInFile("Jenkinsfile", /deploy:/, "false", "true");
    await replaceInFile("Jenkinsfile", /repositoryUrl:/, "null", `"${url}"`);
}

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

    /* enable deployment of documentation if a documentation url is provided */
    await enableDeployDocs(context);
}
