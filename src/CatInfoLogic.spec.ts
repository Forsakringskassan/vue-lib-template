import { beforeEach, describe, expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";
import { useCatInfo } from "./cat-info-logic";

vi.mock(import("./cat-api"));

describe("useCatInfo", () => {
    let logic: ReturnType<typeof useCatInfo>;

    beforeEach(() => {
        vi.useFakeTimers();
        logic = useCatInfo();
        vi.mocked(catGetById).mockReset();
    });

    it("should have initial state", () => {
        expect.assertions(3);
        expect(logic.loading.value).toBe(false);
        expect(logic.cat.value).toBeNull();
        expect(logic.error.value).toBeNull();
    });

    it("should set loading then data for valid cat ID", async () => {
        expect.assertions(5);

        const mockCat = {
            id: "whiskers-001",
            name: "Whiskers McFluffington",
            age: 3,
            breed: "European Shorthair",
            color: "Orange Tabby",
            favoriteFood: "Tuna",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        const fetchPromise = logic.fetchCat("whiskers-001");

        // loading should be true immediately
        expect(logic.loading.value).toBe(true);

        // fast-forward the timer to resolve the simulated backend call
        vi.advanceTimersByTime(300);
        await fetchPromise;

        expect(logic.loading.value).toBe(false);
        expect(logic.cat.value).not.toBeNull();
        expect(logic.cat.value?.name).toBe("Whiskers McFluffington");
        expect(logic.error.value).toBeNull();
    });

    it("should set error for invalid cat ID", async () => {
        expect.assertions(4);

        vi.mocked(catGetById).mockRejectedValue(
            new Error("Cat with ID 'invalid-id' not found"),
        );

        const fetchPromise = logic.fetchCat("invalid-id");

        vi.advanceTimersByTime(300);
        await fetchPromise;

        expect(logic.loading.value).toBe(false);
        expect(logic.cat.value).toBeNull();
        expect(logic.error.value).not.toBeNull();
        expect(logic.error.value).toContain("not found");
    });

    it("should modify cat data", () => {
        expect.assertions(2);
        const testCat = {
            id: "test",
            name: "Original",
            age: 5,
            breed: "Test",
            color: "Test",
            favoriteFood: "Test",
        };
        logic.cat.value = testCat;

        logic.updateCat({ ...testCat, name: "Updated" });

        expect(logic.cat.value.name).toBe("Updated");
        expect(logic.cat.value.age).toBe(5);
    });

    it("should fetch cat for luna-002", async () => {
        expect.assertions(2);

        const mockCat = {
            id: "luna-002",
            name: "Luna the Midnight Prowler",
            age: 2,
            breed: "Bombay",
            color: "Midnight Black",
            favoriteFood: "Salmon",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        const fetchPromise = logic.fetchCat("luna-002");

        vi.advanceTimersByTime(300);
        await fetchPromise;

        expect(logic.cat.value!.name).toBe("Luna the Midnight Prowler");
        expect(logic.cat.value!.color).toBe("Midnight Black");
    });

    it("should fetch cat for muffin-003", async () => {
        expect.assertions(2);

        const mockCat = {
            id: "muffin-003",
            name: "Sir Muffin III",
            age: 5,
            breed: "Maine Coon",
            color: "Calico",
            favoriteFood: "Chicken",
        };
        vi.mocked(catGetById).mockResolvedValue(mockCat);

        const fetchPromise = logic.fetchCat("muffin-003");

        vi.advanceTimersByTime(300);
        await fetchPromise;

        expect(logic.cat.value!.name).toBe("Sir Muffin III");
        expect(logic.cat.value!.breed).toBe("Maine Coon");
    });
});
