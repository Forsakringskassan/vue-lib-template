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

/**
 * Update placeholder names with the real application name (from `package.json`)
 */
async function updatePackageName(context: InstallContext): Promise<void> {
    const { getApplicationName, replaceInFile } = context;
    const scopedName = getApplicationName();
    const placeholder = /"@forsakringskassan\/vue-lib-template(\/[^"]+)?"/g;
    const filenames = [
        "cypress/tsconfig.json",
        "etc/lib.api.md",
        "etc/selectors.api.md",
        "etc/tsconfig.json",
        "src/components/guide/cat-info/examples/cat-info-example.vue",
        "tsconfig.cypress.json",
        "tsconfig.lib.json",
        "tsconfig.selectors.json",
    ];
    for (const filename of filenames) {
        await replaceInFile(filename, placeholder, (_, subpath) => {
            return `"${scopedName}${subpath ?? ""}"`;
        });
    }
}

/**
 * Enable deployment of documentation if a documentation url is provided
 */
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
    await updatePackagejson(context);
    await updatePackageName(context);
    await enableDeployDocs(context);
}
