import { beforeEach, describe, expect, it, vi } from "vitest";
import { catGetById } from "./cat-api";
import { resetCatApiPath } from "./cat-api-config";
import { setCatApiPath } from ".";

describe("FcCatInfo public exports", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
        resetCatApiPath();
    });

    it("should use setCatApiPath from public entrypoint", async () => {
        expect.assertions(1);
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({}),
        } as Response);

        setCatApiPath("/entrypoint-configured/cats");
        await catGetById("whiskers-001");

        expect(fetch).toHaveBeenCalledWith(
            "/entrypoint-configured/cats?id=whiskers-001",
        );
    });
});
