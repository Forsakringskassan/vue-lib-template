<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { FButton, FCard, FDefinitionList, FLoader, FNumericTextField, FTextField, FValidationForm } from "@fkui/vue";
import type { Cat } from "./cat-data";
import { useCatInfo } from "./cat-info-logic";

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

const editForm = ref<Cat>({ id: "", name: "", age: 0, breed: "", color: "", favoriteFood: "" });

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
function onSubmit(): void {
    updateCat(editForm.value);
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

/**
 * Computed property for definition list items in view mode
 */
const catDefinitions = computed(() => {
    if (!cat.value) {
        return [];
    }
    return [
        { term: "Namn", definition: cat.value.name },
        { term: "Ålder", definition: `${cat.value.age} år` },
        { term: "Ras", definition: cat.value.breed },
        { term: "Färg", definition: cat.value.color },
        { term: "Favoritmat", definition: cat.value.favoriteFood },
    ];
});
</script>

<template>
    <f-card>
        <template #header>
            <h2>Kattinformation</h2>
        </template>
        <template #default>
            <div>
                <!-- Loading state -->
                <div v-if="loading" data-test="cat-info-loading">
                    <f-loader show> Hämtar kattinformation... </f-loader>
                </div>

                <!-- Cat data - View mode -->
                <div v-else-if="cat && !isEditable" data-test="cat-info-view">
                    <f-definition-list :definitions="catDefinitions" />
                </div>

                <!-- Cat data - Edit mode -->
                <div v-else-if="cat && isEditable" data-test="cat-info-edit">
                    <f-validation-form @submit="onSubmit">
                        <template #error-message> Oj, du har glömt fylla i något. Gå till: </template>
                        <template #default>
                            <f-text-field
                                v-model="editForm.name"
                                v-validation.required.maxLength="100"
                                data-test="edit-name"
                            >
                                Namn
                            </f-text-field>

                            <f-numeric-text-field v-model="editForm.age" v-validation.required data-test="edit-age">
                                Ålder
                            </f-numeric-text-field>

                            <f-text-field
                                v-model="editForm.breed"
                                v-validation.required.maxLength="100"
                                data-test="edit-breed"
                            >
                                Ras
                            </f-text-field>

                            <f-text-field
                                v-model="editForm.color"
                                v-validation.required.maxLength="100"
                                data-test="edit-color"
                            >
                                Färg
                            </f-text-field>

                            <f-text-field
                                v-model="editForm.favoriteFood"
                                v-validation.maxLength="500"
                                data-test="edit-favorite-food"
                            >
                                Favoritmat
                            </f-text-field>
                            <div class="button-group">
                                <f-button class="button-group__item" size="large" variant="primary" type="submit">
                                    Spara
                                </f-button>
                                <f-button class="button-group__item" size="large" variant="secondary" @click="onCancel">
                                    Avbryt
                                </f-button>
                            </div>
                        </template>
                    </f-validation-form>
                </div>
            </div>
        </template>
    </f-card>
</template>
