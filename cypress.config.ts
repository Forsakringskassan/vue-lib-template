import { init as installAxe } from "@forsakringskassan/cypress-axe/plugins";
import {
    defineConfig,
    htmlValidatePlugin,
} from "@forsakringskassan/cypress-config";
import getToMatchScreenshotsPlugin from "@forsakringskassan/cypress-visual-regression/plugin";

async function installPlugins(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
    getToMatchScreenshotsPlugin(on, config);
    config = await htmlValidatePlugin(on, config);
    config = installAxe(on, config, {
        context: {
            include: [
                [".code-preview"],
                ["[data-preview]"],
                ["[data-cy-root]"],
            ],
            exclude: [
                [".calendar__item--selected"],
                [".file-selector input"],
                [".wizard-step__header__title"],
                [".live-example__code"],
            ],
        },
    });
    return config;
}

export default defineConfig({
    // Cypress may sometimes restart tests when it detects a changed file in the __screenshot__ folder.
    watchForFileChanges: false,
    reporter: require.resolve("mocha-multi-reporters"),
    reporterOptions: {
        reporterEnabled: "spec, mocha-junit-reporter",
        mochaJunitReporterReporterOptions: {
            mochaFile: "test-results/cypress-test-output_[hash].xml",
        },
    },
    component: {
        async setupNodeEvents(on, config) {
            return await installPlugins(on, config);
        },
    },
    defaultBrowser: "chrome",
    hosts: { localhost: "127.0.0.1" },
});
