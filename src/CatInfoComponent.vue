<script setup lang="ts">
import { ref, watch } from "vue";
import { FCard, FLoader } from "@fkui/vue";
import CatInfoEdit from "./CatInfoEdit.vue";
import CatInfoShow from "./CatInfoShow.vue";
import { useCatInfo } from "./cat-info-logic";
import { type Cat } from "./cat-types";

interface Props {
    /**
     * The cat ID to display
     */
    catId: string;
    /**
     * Whether the cat information should be editable
     */
    isEditable?: boolean;
}

const props = defineProps<Props>();

const { loading, cat, fetchCat, updateCat } = useCatInfo();

const editForm = ref({ id: "", name: "", age: 0, breed: "", color: "", favoriteFood: "" });

watch(
    () => props.catId,
    async (newCatId) => {
        if (!newCatId) {
            return;
        }

        await fetchCat(newCatId);
        if (cat.value) {
            editForm.value = { ...cat.value };
        }
    },
    { immediate: true },
);

/**
 * Submit the edited cat information
 */
function onSubmit(updatedCat: Cat): void {
    updateCat(updatedCat);
}

/**
 * Cancel editing and reload original data
 */
async function onCancel(): Promise<void> {
    if (!props.catId) {
        return;
    }

    await fetchCat(props.catId);
    if (cat.value) {
        editForm.value = { ...cat.value };
    }
}
</script>

<template>
    <f-card>
        <template #header>
            <h2>Kattinformation</h2>
        </template>
        <template #default>
            <div>
                <!-- Loading state -->
                <f-loader v-if="loading" show data-test="cat-info-loading"> Hämtar kattinformation... </f-loader>

                <!-- Cat data - View mode -->
                <cat-info-show v-else-if="cat && !isEditable" :cat />

                <!-- Cat data - Edit mode -->
                <cat-info-edit v-else-if="cat && isEditable" :cat @submit="onSubmit" @cancel="onCancel" />
            </div>
        </template>
    </f-card>
</template>
