const DEFAULT_CAT_API_PATH = "/api/cat";

let catApiPath = DEFAULT_CAT_API_PATH;

/**
 * @public
 * Configure a root-relative API path for cat endpoint requests.
 * The value is global mutable state shared by all component instances.
 */
export function setCatApiPath(path: string): void {
    if (/^(?:[a-z]+:)?\/\//iu.test(path) || !path.startsWith("/")) {
        throw new Error("catApiPath must be a root-relative path");
    }

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
