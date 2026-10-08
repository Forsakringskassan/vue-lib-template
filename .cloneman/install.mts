import { type InstallContext } from "cloneman";

async function updatePackagejson(context: InstallContext): Promise<void> {
    const { getParameter, updateJsonFile } = context;

    /* write repository url to "package.json" */
    const repoUrl = getParameter("code-repo-url");
    await updateJsonFile("package.json", {
        repository: {
            type: "git",
            url: `git+${repoUrl}`,
        },
    });
}

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

    await updatePackagejson(context);

    /* update placeholder names with the real application name (from package.json) */
    const placeholder = /"@forsakringskassan\/vue-lib-template(\/[^"]+)?"/g;
    const quotedName = (_: string, subpath: string | undefined): string => {
        return `"${scopedName}${subpath ?? ""}"`;
    };
    await replaceInFile("cypress/tsconfig.json", placeholder, quotedName);
    await replaceInFile("tsconfig.lib.json", placeholder, quotedName);
    await replaceInFile("tsconfig.cypress.json", placeholder, quotedName);
    await replaceInFile("tsconfig.selectors.json", placeholder, quotedName);
    await replaceInFile(
        "src/components/guide/cat-info/examples/cat-info-example.vue",
        placeholder,
        quotedName,
    );
    await replaceInFile(
        "src/components/guide/cat-info/examples/cat-info-live-example.vue",
        placeholder,
        quotedName,
    );

    /* enable deployment of documentation if a documentation url is provided */
    await enableDeployDocs(context);
}
