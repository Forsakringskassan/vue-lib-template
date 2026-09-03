<script setup lang="ts">
import { ref } from "vue";
import CatInfoComponent from "../CatInfoComponent.vue";

const selectedCatId = ref("whiskers-001");
const isEditable = ref(false);
</script>

<template>
    <div class="cat-example__component">
        <!-- eslint-disable-next-line vue/v-bind-style -->
        <cat-info-component :cat-id="selectedCatId" :is-editable="isEditable" />
    </div>
</template>

<style lang="scss" scoped>
.cat-example__component {
    margin: 2rem;
    max-width: 800px;
}
</style>
