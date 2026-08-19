import defaultConfig, {
    docsConfig,
    examplesConfig,
} from "@forsakringskassan/eslint-config";
import cliConfig from "@forsakringskassan/eslint-config-cli";
import cypressConfig from "@forsakringskassan/eslint-config-cypress";
import typescriptConfig from "@forsakringskassan/eslint-config-typescript";
import typeinfoConfig from "@forsakringskassan/eslint-config-typescript-typeinfo";
import vitestConfig from "@forsakringskassan/eslint-config-vitest";
import vueConfig from "@forsakringskassan/eslint-config-vue";
import pkg from "./package.json" with { type: "json" };

export default [
    {
        name: "Ignored files",
        ignores: [
            "**/assets/**",
            "**/coverage/**",
            "**/dist/**",
            "**/node_modules/**",
            "**/public/**",
            "**/temp/**",
            "docs/examples/**/*-nolint*",
        ],
    },

    ...defaultConfig,

    cliConfig(pkg),
    typescriptConfig(),
    typeinfoConfig(import.meta.dirname, {
        files: ["src/**/*.{ts,vue}"],
    }),
    vueConfig(),
    vitestConfig(),
    cypressConfig(),
    docsConfig(),
    examplesConfig(),

    {
        name: "local/vue-allow-style",
        files: ["**/*.vue"],
        rules: {
            "vue/no-restricted-block": "off",
        },
    },

    {
        name: "local/selectors",
        files: ["**/*.selectors.ts"],
        rules: {
            /* we explicitly want to use implicit typing for the selector objects */
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },

    {
        /* mimic how @vue/eslint-config-typescript disables these typechecking rules
         * https://github.com/vuejs/eslint-config-typescript/blob/ff3e8c2a75afda59f16dc5dfd5f1b6e863cb1a2c/src/internals.ts#L153-L168 */
        name: "local/vue-type-checking",
        files: ["**/src/{main,router}.ts"],
        rules: {
            /* gives error on `createApp()` */
            "@typescript-eslint/no-unsafe-argument": "off",
            /* gives error in router configuration */
            "@typescript-eslint/no-unsafe-assignment": "off",
        },
    },
];
