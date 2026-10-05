import type { Cat } from "./cat-types";

const apiUrl = import.meta.env.VITE_CAT_API_URL;

/**
 * @internal
 */
export async function catGetById(id: string): Promise<Cat> {
    const query = new URLSearchParams({ id }).toString();
    const response = await fetch(`${apiUrl}?${query}`);

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? `Failed to fetch cat with ID ${id}`);
    }

    return (await response.json()) as Cat;
}
