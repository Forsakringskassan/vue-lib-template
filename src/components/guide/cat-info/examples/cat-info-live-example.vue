<script lang="ts">
import { defineComponent } from "vue";
import { FCheckboxField, FSelectField } from "@fkui/vue";
import { LiveExample } from "@forsakringskassan/docs-live-example";
import { getCatIds } from "../cat-data.js";
import FcCatInfo from "../cat-info.vue";

export default defineComponent({
    name: "FcCatInfoLiveExample",
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
            return { FcCatInfo };
        },
        editableAttr(): string {
            return this.isEditable ? " is-editable" : "";
        },
        template(): string {
            return /* HTML */ `
                <fc-cat-info cat-id="${this.selectedCatId}" ${this.editableAttr} />
            `;
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
