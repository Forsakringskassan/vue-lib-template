/**
 * @param {import("cloneman").InstallContext} context
 */
export default async (context) => {
    const { getParameter, replaceInFile, updateJsonFile } = context;

    /* write repository url to "package.json" */
    const repoUrl = getParameter("repo-url");
    await updateJsonFile("package.json", {
        repository: {
            type: "git",
            url: repoUrl,
        },
    });

    /* enable deployment of documentation if a documentation url is provided */
    const docsRepo = getParameter("docs-repo-url");
    if (docsRepo !== "") {
        await replaceInFile("Jenkinsfile", /deploy:/, "false", "true");
        await replaceInFile(
            "Jenkinsfile",
            /repositoryUrl:/,
            "null",
            `"${docsRepo}"`,
        );
    }
};
