import {
    axePlugin,
    defineConfig,
    htmlValidatePlugin,
} from "@forsakringskassan/cypress-config";
import getToMatchScreenshotsPlugin from "@forsakringskassan/cypress-visual-regression/plugin";

async function installPlugins(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
    getToMatchScreenshotsPlugin(on, config);
    config = await axePlugin(on, config);
    config = await htmlValidatePlugin(on, config);
    return config;
}

export default defineConfig(import.meta.dirname, {
    // Cypress may sometimes restart tests when it detects a changed file in the __screenshot__ folder.
    watchForFileChanges: false,
    component: {
        async setupNodeEvents(on, config) {
            return await installPlugins(on, config);
        },
        excludeSpecPattern: ["temp/**"], // cloneman puts cy-files in temp folder during build
    },
    defaultBrowser: "chrome",
    hosts: { localhost: "127.0.0.1" },
});
