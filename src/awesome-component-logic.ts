import type { Ref } from "vue";
import { ref } from "vue";

interface Data {
    reply: string;
}

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
        const response = await fetch("/api/awesome-endpoint");
        data.value = ((await response.json()) as Data).reply;
        loading.value = false;
    }

    return { loading, data, fetchData };
}
