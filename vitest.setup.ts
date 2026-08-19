/* include typescript declarations for vite static asset handling (e.g. `?raw`) */
/// <reference types="vite/client" />

import { ElementIdService } from "@fkui/logic";
import { config, enableAutoUnmount } from "@vue/test-utils";
import { afterEach } from "vitest";

config.global.config.warnHandler = (msg, _instance, trace) => {
    throw new Error(`Vue warning: ${msg}\n${trace}`);
};

enableAutoUnmount(afterEach);

afterEach(() => {
    /* reset id generation to ensure we get a stable result no matter which/what
     * order tests are run */
    ElementIdService.reset();
});
