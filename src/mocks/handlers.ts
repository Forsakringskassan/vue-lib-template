// src/mocks/handlers.ts
import { matchRequest } from "@forsakringskassan/apimock-express/browser";
import { http } from "msw";
import mocks from "../mocks.mts";

export const handlers = [
    http.all("/api/*", async (req) => {
        return await matchRequest(mocks, req.request);
    }),
];
