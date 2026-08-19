import { defineConfig } from "cypress";
import exclude from "@fkui/vue/htmlvalidate/cypress";
import { init as installAxe } from "@forsakringskassan/cypress-axe/plugins";
import getToMatchScreenshotsPlugin from "@forsakringskassan/cypress-visual-regression/plugin";
import htmlvalidate, {
    CypressHtmlValidateOptions,
} from "cypress-html-validate/plugin";
import { type ConfigData } from "html-validate";

function installPlugins(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions {
    getToMatchScreenshotsPlugin(on, config);
    htmlvalidate.install(on, htmlValidateConfig, htmlValidateOptions);
    config = installAxe(on, config);
    return config;
}

const htmlValidateConfig: ConfigData = {
    rules: {
        /* some examples show how to use custom heading levels which often
         * doesn't match the heading outline for the documentation */
        "heading-level": ["off"],

        /* prevents mismatches from disabled rules which does not trigger errors
         * when Cypress tests are running but would yield errors during normal
         * validation */
        "no-unused-disable": "off",

        /* we cannot use native progressbar element due to SLA */
        "prefer-native-element": [
            "error",
            {
                exclude: ["progressbar"],
            },
        ],

        /* sadly we dont use SRI at FK */
        "require-sri": "off",
    },
};

const htmlValidateOptions: CypressHtmlValidateOptions = {
    include: [
        /* Cypress component tests */
        "#__cy_vue_root > div",
    ],
    exclude,
};

export default defineConfig({
    allowCypressEnv: false,
    // Cypress may sometimes restart tests when it detects a changed file in the __screenshot__ folder.
    watchForFileChanges: false,
    /* disable video recording, it is to slow both on remote machines and on
     * CI/CD testing. */
    video: false,
    reporter: require.resolve("mocha-multi-reporters"),
    reporterOptions: {
        reporterEnabled: "spec, mocha-junit-reporter",
        mochaJunitReporterReporterOptions: {
            mochaFile: "test-results/cypress-test-output_[hash].xml",
        },
    },
    component: {
        setupNodeEvents(on, config) {
            return installPlugins(on, config);
        },
        devServer: {
            framework: "vue",
            bundler: "vite",
        },
    },
    defaultBrowser: "chrome",
    hosts: { localhost: "127.0.0.1" },
});
