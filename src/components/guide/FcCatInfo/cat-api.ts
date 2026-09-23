import type { Cat } from "./cat-types";

/**
 * @internal
 */
export async function catGetById(
    id: string,
    apiPath: string = "/api/cat",
): Promise<Cat> {
    const url = new URL(apiPath, window.location.origin);
    url.searchParams.set("id", id);

    const response = await fetch(url);

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? `Failed to fetch cat with ID ${id}`);
    }

    return (await response.json()) as Cat;
}
