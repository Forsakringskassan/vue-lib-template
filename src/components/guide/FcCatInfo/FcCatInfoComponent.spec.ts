import { mount } from "@vue/test-utils";
import { beforeEach, expect, it, vi } from "vitest";
import FcCatInfoComponent from "./FcCatInfoComponent.vue";
import { catGetById } from "./cat-api";
import { cats } from "./cat-data";

vi.mock(import("./cat-api"));

beforeEach(() => {
    vi.mocked(catGetById).mockReset();
    vi.mocked(catGetById).mockResolvedValue(cats[0]);
});

it("should fetch cat with default api path", async () => {
    expect.assertions(1);
    mount(FcCatInfoComponent, {
        props: { catId: cats[0].id },
    });

    await vi.waitFor(() => {
        expect(catGetById).toHaveBeenCalledWith(cats[0].id);
    });
});
