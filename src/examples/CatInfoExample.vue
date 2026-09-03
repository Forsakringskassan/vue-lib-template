<script setup lang="ts">
import { ref } from "vue";
import CatInfoComponent from "../CatInfoComponent.vue";

const selectedCatId = ref("whiskers-001");
const isEditable = ref(false);
</script>

<template>
    <div class="cat-example">
        <h1>Kattinformation - Exempel</h1>

        <div class="cat-example__controls">
            <label>
                <input v-model="selectedCatId" type="radio" value="whiskers-001" />
                Whiskers McFluffington
            </label>
            <label>
                <input v-model="selectedCatId" type="radio" value="luna-002" />
                Luna the Midnight Prowler
            </label>
            <label>
                <input v-model="selectedCatId" type="radio" value="muffin-003" />
                Sir Muffin III
            </label>
        </div>

        <div class="cat-example__controls">
            <label>
                <input v-model="isEditable" type="checkbox" />
                Redigerbar läge
            </label>
        </div>

        <div class="cat-example__component">
            <!-- eslint-disable-next-line vue/v-bind-style -->
            <cat-info-component :cat-id="selectedCatId" :is-editable="isEditable" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cat-example {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.cat-example__controls {
    margin: 1rem 0;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;

    label {
        display: block;
        margin: 0.5rem 0;
        cursor: pointer;

        input {
            margin-right: 0.5rem;
        }
    }
}

.cat-example__component {
    margin-top: 2rem;
}
</style>
