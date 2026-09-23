import { beforeEach, describe, expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";
import { resetCatApiPath, setCatApiPath } from "./cat-api-config";

describe("catGetById", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
        resetCatApiPath();
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

        expect(fetch).toHaveBeenCalledWith("/api/cat?id=whiskers-001");
        expect(result).toEqual(mockCat);
    });

    it("should use configured global api path", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        } as Response);

        setCatApiPath("/custom-api/cats");
        await catGetById("whiskers-001");

        expect(fetch).toHaveBeenCalledWith("/custom-api/cats?id=whiskers-001");
    });

    it("should replace existing id when configured path already has query parameters", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        } as Response);

        setCatApiPath("/custom-api/cats?source=test&id=old");
        await catGetById("whiskers-001");

        expect(fetch).toHaveBeenCalledWith(
            "/custom-api/cats?source=test&id=whiskers-001",
        );
    });

    it("should append id before hash fragment", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        } as Response);

        setCatApiPath("/custom-api/cats#details");
        await catGetById("whiskers-001");

        expect(fetch).toHaveBeenCalledWith(
            "/custom-api/cats?id=whiskers-001#details",
        );
    });

    it("should reject absolute api path", () => {
        expect.assertions(1);
        expect(() => {
            setCatApiPath("https://api.example.com/cat");
        }).toThrow("catApiPath must be a root-relative path");
    });

    it("should reject protocol-relative api path", () => {
        expect.assertions(1);
        expect(() => {
            setCatApiPath("//api.example.com/cat");
        }).toThrow("catApiPath must be a root-relative path");
    });

    it("should reject path without leading slash", () => {
        expect.assertions(1);
        expect(() => {
            setCatApiPath("api/cat");
        }).toThrow("catApiPath must be a root-relative path");
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
