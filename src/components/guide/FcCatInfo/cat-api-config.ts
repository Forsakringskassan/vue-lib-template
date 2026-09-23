const DEFAULT_CAT_API_PATH = "/api/cat";

let catApiPath = DEFAULT_CAT_API_PATH;

/**
 * Configure global API path for cat endpoint.
 */
export function setCatApiPath(path: string): void {
    catApiPath = path;
}

/**
 * @internal
 */
export function getCatApiPath(): string {
    return catApiPath;
}

/**
 * @internal
 */
export function resetCatApiPath(): void {
    catApiPath = DEFAULT_CAT_API_PATH;
}
