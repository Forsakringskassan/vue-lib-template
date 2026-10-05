import { beforeEach, describe, expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";
import { useCatInfo } from "./cat-info-logic";

vi.mock(import("./cat-api"));
//vi.useFakeTimers();

describe("useCatInfo", () => {
    beforeEach(() => {
        vi.mocked(catGetById).mockReset();
    });

    it("should have initial state", () => {
        expect.assertions(3);
        const { loading, cat, error } = useCatInfo();
        expect(loading.value).toBe(false);
        expect(cat.value).toBeNull();
        expect(error.value).toBeNull();
    });

    it("should set loading then data for valid cat ID", async () => {
        expect.assertions(5);
        const { loading, cat, error, fetchCat } = useCatInfo();
        const mockCat = {
            id: "whiskers-001",
            name: "Whiskers McFluffington",
            age: 3,
            breed: "European Shorthair",
            color: "Orange Tabby",
            favoriteFood: "Tuna",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        const fetchPromise = fetchCat("whiskers-001");

        // loading should be true immediately
        expect(loading.value).toBe(true);

        await fetchPromise;

        expect(loading.value).toBe(false);
        expect(cat.value).not.toBeNull();
        expect(cat.value?.name).toBe("Whiskers McFluffington");
        expect(error.value).toBeNull();
    });

    it("should set error for invalid cat ID", async () => {
        expect.assertions(4);
        const { loading, cat, error, fetchCat } = useCatInfo();
        vi.mocked(catGetById).mockRejectedValue(
            new Error("Cat with ID 'invalid-id' not found"),
        );

        await fetchCat("invalid-id");

        expect(loading.value).toBe(false);
        expect(cat.value).toBeNull();
        expect(error.value).not.toBeNull();
        expect(error.value).toContain("not found");
    });

    it("should modify cat data", () => {
        expect.assertions(2);
        const { cat, updateCat } = useCatInfo();
        const testCat = {
            id: "test",
            name: "Original",
            age: 5,
            breed: "Test",
            color: "Test",
            favoriteFood: "Test",
        };
        cat.value = testCat;

        updateCat({ ...testCat, name: "Updated" });

        expect(cat.value.name).toBe("Updated");
        expect(cat.value.age).toBe(5);
    });

    it("should fetch cat for luna-002", async () => {
        expect.assertions(2);
        const { cat, fetchCat } = useCatInfo();
        const mockCat = {
            id: "luna-002",
            name: "Luna the Midnight Prowler",
            age: 2,
            breed: "Bombay",
            color: "Midnight Black",
            favoriteFood: "Salmon",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        await fetchCat("luna-002");

        expect(cat.value!.name).toBe("Luna the Midnight Prowler");
        expect(cat.value!.color).toBe("Midnight Black");
    });

    it("should fetch cat for muffin-003", async () => {
        expect.assertions(2);
        const { cat, fetchCat } = useCatInfo();
        const mockCat = {
            id: "muffin-003",
            name: "Sir Muffin III",
            age: 5,
            breed: "Maine Coon",
            color: "Calico",
            favoriteFood: "Chicken",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        await fetchCat("muffin-003");

        expect(cat.value!.name).toBe("Sir Muffin III");
        expect(cat.value!.breed).toBe("Maine Coon");
    });
});
