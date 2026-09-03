<script setup lang="ts">
import { FButton, FNumericTextField, FTextField, FValidationForm } from "@fkui/vue";
import { type Cat } from "./cat-types";

interface Props {
    cat: Cat;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "submit", cat: Cat): void;
    (e: "cancel"): void;
}>();

// Create a local copy for editing
const editForm = { ...props.cat };
</script>

<template>
    <div data-test="cat-info-edit">
        <f-validation-form @submit="emit('submit', editForm)">
            <template #error-message> Oj, du har glömt fylla i något. Gå till: </template>
            <template #default>
                <f-text-field v-model="editForm.name" v-validation.required.maxLength="100" v-test="'edit-name'">
                    Namn
                </f-text-field>

                <f-numeric-text-field v-model="editForm.age" v-validation.required v-test="'edit-age'">
                    Ålder
                </f-numeric-text-field>

                <f-text-field v-model="editForm.breed" v-validation.required.maxLength="100" v-test="'edit-breed'">
                    Ras
                </f-text-field>

                <f-text-field v-model="editForm.color" v-validation.required.maxLength="100" v-test="'edit-color'">
                    Färg
                </f-text-field>

                <f-text-field
                    v-model="editForm.favoriteFood"
                    v-validation.maxLength="500"
                    v-test="'edit-favorite-food'"
                >
                    Favoritmat
                </f-text-field>
                <div class="button-group">
                    <f-button class="button-group__item" size="large" variant="primary" type="submit"> Spara </f-button>
                    <f-button class="button-group__item" size="large" variant="secondary" @click="emit('cancel')">
                        Avbryt
                    </f-button>
                </div>
            </template>
        </f-validation-form>
    </div>
</template>
