/* eslint-disable unicorn/filename-case -- technical debt */
import { matchRequest } from "@forsakringskassan/apimock-express/browser";
import { http } from "msw";
import { setupWorker } from "msw/browser";
import mocks from "../../src/mocks.mts";

const handlers = [
    http.all("/api/*", async (req) => {
        return await matchRequest(mocks, req.request);
    }),
];
const worker = setupWorker(...handlers);

/* eslint-disable-next-line unicorn/no-global-object-property-assignment -- technical debt */
window.bundleMocks = worker.start({
    serviceWorker: {
        url: `${document.documentElement.dataset["rootUrl"]}/mockServiceWorker.js`,
    },
});
