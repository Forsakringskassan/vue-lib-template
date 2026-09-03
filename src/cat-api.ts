import type { Cat } from "./cat-types";

/**
 * @internal
 */
export async function catGetById(id: string): Promise<Cat> {
    const response = await fetch(`/api/cat?id=${id}`);

    if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? `Failed to fetch cat with ID ${id}`);
    }

    return (await response.json()) as Cat;
}
