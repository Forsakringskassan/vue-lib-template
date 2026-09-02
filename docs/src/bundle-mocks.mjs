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
// eslint-disable-next-line no-undef -- technical debt
const rootUrl = document.documentElement.dataset["rootUrl"];
const url = `${rootUrl}/mock-service-worker.js`;

// eslint-disable-next-line unicorn/no-global-object-property-assignment, no-undef -- technical debt
window.bundleMocks = worker.start({
    serviceWorker: {
        url,
    },
});
