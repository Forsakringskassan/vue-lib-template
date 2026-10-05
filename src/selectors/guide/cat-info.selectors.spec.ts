import { TestPlugin, ValidationPlugin } from "@fkui/vue";
import { mount } from "@vue/test-utils";
import { beforeEach, expect, it, vi } from "vitest";
import { catGetById } from "../../components/guide/cat-info/cat-api";
import { cats } from "../../components/guide/cat-info/cat-data";
import FcCatInfo from "../../components/guide/cat-info/cat-info.vue";
import { FcCatInfoSelectors } from "./cat-info.selectors";

vi.mock(import("../../components/guide/cat-info/cat-api"));

beforeEach(() => {
    vi.mocked(catGetById).mockResolvedValue(cats[0]);
});

it("should use the default selector", () => {
    expect.assertions(2);
    const wrapper = mount(FcCatInfo, {
        props: { catId: cats[0].id },
    });
    const { selector } = FcCatInfoSelectors();

    expect(selector).toBe(":scope");
    expect(wrapper.find(selector).exists()).toBe(true);
});

it("should find the component with an explicit selector", () => {
    expect.assertions(2);
    const wrapper = mount(FcCatInfo, {
        attrs: { "data-test": "my-cat-info" },
        props: { catId: cats[0].id },
    });
    const { selector } = FcCatInfoSelectors('[data-test="my-cat-info"]');

    expect(selector).toBe('[data-test="my-cat-info"]');
    expect(wrapper.find(selector).exists()).toBe(true);
});

it("should find the loading container", () => {
    expect.assertions(1);
    const wrapper = mount(FcCatInfo, {
        props: { catId: cats[0].id },
    });
    const { loadingContainer } = FcCatInfoSelectors();

    expect(wrapper.get(loadingContainer()).text()).toContain(
        "Hämtar kattinformation...",
    );
});

it("should find all view mode elements", async () => {
    expect.assertions(5);
    const wrapper = mount(FcCatInfo, {
        props: { catId: cats[0].id, isEditable: false },
    });
    const selectors = FcCatInfoSelectors();

    await vi.waitFor(() => {
        if (!wrapper.find(selectors.viewContainer()).exists()) {
            throw new Error("View container has not been rendered yet");
        }
    });

    const view = wrapper.get(selectors.viewContainer());
    expect(view.text()).toContain(cats[0].name);
    expect(view.text()).toContain(`${cats[0].age} år`);
    expect(view.text()).toContain(cats[0].breed);
    expect(view.text()).toContain(cats[0].color);
    expect(view.text()).toContain(cats[0].favoriteFood);
});

it("should find all edit mode inputs", async () => {
    expect.assertions(6);
    const wrapper = mount(FcCatInfo, {
        props: { catId: cats[0].id, isEditable: true },
        global: {
            plugins: [TestPlugin, ValidationPlugin],
        },
    });
    const selectors = FcCatInfoSelectors();

    await vi.waitFor(() => {
        if (!wrapper.find(selectors.editContainer()).exists()) {
            throw new Error("Edit container has not been rendered yet");
        }
    });

    expect(wrapper.find(selectors.editContainer()).exists()).toBe(true);

    expect(
        wrapper.get<HTMLInputElement>(selectors.nameInput()).element.value,
    ).toBe(cats[0].name);

    expect(
        wrapper.get<HTMLInputElement>(selectors.ageInput()).element.value,
    ).toBe(cats[0].age.toString());

    expect(
        wrapper.get<HTMLInputElement>(selectors.breedInput()).element.value,
    ).toBe(cats[0].breed);

    expect(
        wrapper.get<HTMLInputElement>(selectors.colorInput()).element.value,
    ).toBe(cats[0].color);

    expect(
        wrapper.get<HTMLInputElement>(selectors.favoriteFoodInput()).element
            .value,
    ).toBe(cats[0].favoriteFood);
});
