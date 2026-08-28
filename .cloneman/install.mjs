/**
 * @param {import("cloneman").InstallContext} context
 */
export default async (context) => {
    const { getParameter, updateJsonFile } = context;

    /* write repository url to "package.json" */
    const repoUrl = getParameter("repo-url");
    await updateJsonFile("package.json", {
        repository: {
            type: "git",
            url: repoUrl,
        },
    });
};
