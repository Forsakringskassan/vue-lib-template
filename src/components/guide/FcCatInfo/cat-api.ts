import { getCatApiPath } from "./cat-api-config";
import type { Cat } from "./cat-types";

/**
 * @internal
 */
export async function catGetById(id: string): Promise<Cat> {
    const apiPath = getCatApiPath();
    const url = new URL(apiPath, "http://localhost");
    url.searchParams.set("id", id);
    const requestPath = /^(?:[a-z]+:)?\/\//iu.test(apiPath)
        ? url.href
        : `${url.pathname}${url.search}${url.hash}`;

    const response = await fetch(requestPath);

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? `Failed to fetch cat with ID ${id}`);
    }

    return (await response.json()) as Cat;
}
