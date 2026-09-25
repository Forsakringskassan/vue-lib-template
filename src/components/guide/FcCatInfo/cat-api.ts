import type { Cat } from "./cat-types";

/**
 * @internal
 */
export async function catGetById(id: string): Promise<Cat> {
    const apiUrl = import.meta.env.VITE_CAT_API_URL;
    const query = new URLSearchParams({ id }).toString();
    const separator = apiUrl.includes("?") ? "&" : "?";
    const response = await fetch(`${apiUrl}${separator}${query}`);

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? `Failed to fetch cat with ID ${id}`);
    }

    return (await response.json()) as Cat;
}
