import { describe, expect, it, vi } from "vitest";
import { type AwesomeGetResponse } from "./awesome-api";
import { useAwesomeData } from "./use-awesome-data";

vi.mock(import("./awesome-api"), () => {
    return {
        awesomeGet(): Promise<AwesomeGetResponse> {
            return Promise.resolve({ reply: "Test pong!" });
        },
    };
});

describe("useAwesomeLogic", () => {
    it("should have initial state", () => {
        expect.assertions(2);
        const { loading, data } = useAwesomeData();
        expect(loading.value).toBe(false);
        expect(data.value).toBeNull();
    });

    it("fetchData sets loading then data", async () => {
        expect.assertions(3);
        const { loading, data, fetchData } = useAwesomeData();
        const fetchPromise = fetchData();
        // loading should be true immediately
        expect(loading.value).toBe(true);
        await fetchPromise;
        expect(loading.value).toBe(false);
        expect(data.value).toBe("Test pong!");
    });
});
