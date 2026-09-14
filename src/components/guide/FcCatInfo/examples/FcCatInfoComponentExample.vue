<script setup lang="ts">
import { ref } from "vue";
import FcCatInfoComponent from "../FcCatInfoComponent.vue";

const selectedCatId = ref("whiskers-001");
const isEditable = ref(false);
</script>

<template>
    <div class="cat-example__component">
        <fc-cat-info-component :cat-id="selectedCatId" :is-editable />
    </div>
</template>

<style lang="scss" scoped>
.cat-example__component {
    margin: 2rem;
    max-width: 800px;
}
</style>
