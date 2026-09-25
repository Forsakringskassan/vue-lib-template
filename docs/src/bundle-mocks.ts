import { setupWorker } from "@forsakringskassan/apimock-express/browser";
import mocks from "../../src/mocks/index.mjs";

/* this is resolved from the importmap (mapped to the bundle with the same name
 * compiled in `docs/build.mts`) */
const workerUrl = import.meta.resolve("#mock-service-worker");

export const apimockReady = setupWorker(workerUrl, mocks, {
    type: "module",
});
