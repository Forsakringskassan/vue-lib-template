import { beforeEach, describe, expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";

describe("catGetById", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    it("should return a cat when the response is ok", async () => {
        expect.assertions(2);
        const mockCat = {
            id: "whiskers-001",
            name: "Whiskers McFluffington",
            age: 3,
            breed: "European Shorthair",
            color: "Orange Tabby",
            favoriteFood: "Tuna",
        };

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockCat),
        } as Response);

        const result = await catGetById("whiskers-001");

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/cat?id=whiskers-001",
        );
        expect(result).toEqual(mockCat);
    });

    it("should throw an error with API message when response is not ok", async () => {
        expect.assertions(1);
        const errorResponse = { error: "Cat with ID 'unknown' not found" };

        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            json: () => Promise.resolve(errorResponse),
        } as Response);

        await expect(catGetById("unknown")).rejects.toThrow(
            "Cat with ID 'unknown' not found",
        );
    });

    it("should throw a generic error when response is not ok and no error message is provided", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({}),
        } as Response);

        await expect(catGetById("unknown")).rejects.toThrow(
            "Failed to fetch cat with ID unknown",
        );
    });

    it("should throw an error when fetch fails", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockRejectedValue(new Error("Network failure"));

        await expect(catGetById("whiskers-001")).rejects.toThrow(
            "Network failure",
        );
    });
});
