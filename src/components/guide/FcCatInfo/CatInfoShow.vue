<script setup lang="ts">
import { computed } from "vue";
import { FDefinitionList } from "@fkui/vue";
import { type Cat } from "./cat-types";

interface Props {
    cat: Cat;
}

const props = defineProps<Props>();

const catDefinitions = computed(() => {
    return [
        { term: "Namn", definition: props.cat.name },
        { term: "Ålder", definition: `${props.cat.age} år` },
        { term: "Ras", definition: props.cat.breed },
        { term: "Färg", definition: props.cat.color },
        { term: "Favoritmat", definition: props.cat.favoriteFood },
    ];
});
</script>

<template>
    <div data-test="cat-info-view">
        <f-definition-list :definitions="catDefinitions" />
    </div>
</template>
