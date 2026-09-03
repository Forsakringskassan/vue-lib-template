<script lang="ts">
import { defineComponent } from "vue";
import { FCheckboxField, FSelectField } from "@fkui/vue";
import { LiveExample } from "@forsakringskassan/docs-live-example";
import CatInfoComponent from "./CatInfoComponent.vue";
import { getCatIds } from "./cat-data";

export default defineComponent({
    name: "CatInfoComponentLiveExample",
    components: { LiveExample, FSelectField, FCheckboxField },
    data() {
        return {
            selectedCatId: "whiskers-001",
            isEditable: false,
            catIds: getCatIds(),
        };
    },
    computed: {
        components(): object {
            return { CatInfoComponent };
        },
        editableAttr(): string {
            return this.isEditable ? " is-editable" : "";
        },
        template(): string {
            return /* HTML */ ` <cat-info-component cat-id="${this.selectedCatId}" ${this.editableAttr} /> `;
        },
    },
});
</script>

<template>
    <live-example :components :template>
        <f-select-field v-model="selectedCatId">
            <template #label>Välj katt</template>
            <option value="whiskers-001">Whiskers McFluffington</option>
            <option value="luna-002">Luna the Midnight Prowler</option>
            <option value="muffin-003">Sir Muffin III</option>
        </f-select-field>
        <f-checkbox-field v-model="isEditable" :value="true"> Redigerbar </f-checkbox-field>
    </live-example>
</template>
