import { type App } from "vue";
import { mount } from "cypress/vue";
import { injectSpritesheet } from "@fkui/icon-lib-default/dist/f/injectSpritesheet";
import {
    config,
    setRunningContext,
    FormatPlugin,
    TestPlugin,
    TranslationPlugin,
    ValidationPlugin,
} from "@fkui/vue";
import "@fkui/theme-default";
import "./main.scss";
import "./common";

config.teleportTarget = "#teleport";

Cypress.Commands.add("mount", (component, options = {}) => {
    // Setup options object
    options.global ??= {};
    options.global.plugins ??= [];

    /* Installing validationPlugin */
    options.global.plugins.push({
        install(app: App) {
            app.use(FormatPlugin);
            app.use(ValidationPlugin);
            app.use(TestPlugin);
            app.use(TranslationPlugin);
            setRunningContext(app);

            /* handle warnings as errors */
            app.config.warnHandler = (msg, _info, trace) => {
                throw new Error(`Vue warning: ${msg}\n${trace}`);
            };
        },
    });

    return mount(component, options);
});

injectSpritesheet();
