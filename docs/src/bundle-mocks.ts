/* This file is managed by @forsakringskassan/vue-lib-template. Changes will be overwritten! */

import { setupWorker } from "@forsakringskassan/apimock-express/browser";
import mocks from "../../src/mocks";

/* this is resolved from the importmap (mapped to the bundle with the same name
 * compiled in `docs/build.mts`) */
const workerUrl = import.meta.resolve("#mock-service-worker");

export const apimockReady = setupWorker(workerUrl, mocks, {
    /* this format must match `docs/build.mts` */
    type: "classic",
});
