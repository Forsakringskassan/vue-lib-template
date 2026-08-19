import type { Ref } from "vue";
import { ref } from "vue";

/**
 * Business logic for the Awesome component.
 * Returns reactive refs and a fetch function that simulates a backend call.
 */
export function useAwesomeLogic(): {
    loading: Ref<boolean>;
    data: Ref<string | null>;
    fetchData: () => Promise<void>;
} {
    const loading = ref(false);
    const data = ref<string | null>(null);

    async function fetchData(): Promise<void> {
        loading.value = true;
        const result = await new Promise<{ message: string }>((resolve) => {
            setTimeout(() => {
                resolve({ message: "Hello from backend" });
            }, 300);
        });
        data.value = result.message;
        loading.value = false;
    }

    return { loading, data, fetchData };
}
