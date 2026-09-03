import type { Ref } from "vue";
import { ref } from "vue";
import { catGetById } from "./cat-api";
import type { Cat } from "./cat-data";

/**
 * Business logic for the CatInfoComponent.
 * Manages fetching and updating cat information from mock backend.
 */
export function useCatInfo(): {
    loading: Ref<boolean>;
    cat: Ref<Cat | null>;
    error: Ref<string | null>;
    fetchCat: (catId: string) => Promise<void>;
    updateCat: (newCat: Cat) => void;
} {
    const loading = ref(false);
    const cat = ref<Cat | null>(null);
    const error = ref<string | null>(null);

    /**
     * Fetch cat data from mock backend
     */
    async function fetchCat(catId: string): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            // Get cat from mock backend
            const fetchedCat = await catGetById(catId);
            cat.value = { ...fetchedCat };
        } catch (err) {
            error.value =
                err instanceof Error ? err.message : "Unknown error occurred";
            cat.value = null;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Update cat information
     * @param updates - Partial cat object with fields to update
     */
    function updateCat(newCat: Cat): void {
        if (cat.value) {
            cat.value = { ...newCat };
        }
    }

    return { loading, cat, error, fetchCat, updateCat };
}
