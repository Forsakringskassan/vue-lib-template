import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAwesomeLogic } from "./awesome-component-logic";

describe("useAwesomeLogic", () => {
    let logic: ReturnType<typeof useAwesomeLogic>;

    beforeEach(() => {
        // Reset timers for the Promise timeout
        vi.useFakeTimers();
        logic = useAwesomeLogic();
    });

    it("should have initial state", () => {
        expect.assertions(2);
        expect(logic.loading.value).toBe(false);
        expect(logic.data.value).toBeNull();
    });

    it("fetchData sets loading then data", async () => {
        expect.assertions(3);
        const fetchPromise = logic.fetchData();
        // loading should be true immediately
        expect(logic.loading.value).toBe(true);
        // fast-forward the timer to resolve the simulated backend call
        vi.advanceTimersByTime(300);
        await fetchPromise;
        expect(logic.loading.value).toBe(false);
        expect(logic.data.value).toBe("Hello from backend");
    });
});
