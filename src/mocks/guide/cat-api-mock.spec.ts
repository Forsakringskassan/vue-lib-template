import { matchRequest } from "@forsakringskassan/apimock-express/browser";
import { describe, expect, it } from "vitest";
import catApiMock from "./cat-api.mock.mts";

describe("Cat API Mock Reproduction", () => {
    it("should return 200 for a valid cat id /api/cat?id=whiskers-001", async () => {
        expect.assertions(2);
        const req = new Request("http://localhost:8080/cat?id=whiskers-001");
        const response = await matchRequest([catApiMock], req);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.id).toBe("whiskers-001");
    });

    it("should return 404 for an invalid cat id /api/cat?id=unknown", async () => {
        expect.assertions(2);
        const req = new Request("http://localhost:8080/cat?id=unknown");
        const response = await matchRequest([catApiMock], req);
        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data.error).toContain("not found");
    });
});
