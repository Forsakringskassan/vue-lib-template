<script setup lang="ts">
import { FButton, FCard } from "@fkui/vue";
import { useAwesomeData } from "./use-awesome-data";

const { loading, data, fetchData } = useAwesomeData();
</script>

<template>
    <f-card class="awesome-card">
        <template #header>
            <h2>
                <!-- @slot Heading -->
                <slot>Awesome Component</slot>
            </h2>
        </template>
        <template #default>
            <div class="content">
                <f-button :disabled="loading" variant="primary" size="medium" @click="fetchData">
                    {{ loading ? "Loading..." : "Fetch data" }}
                </f-button>
                <p v-if="data" class="result">{{ data }}</p>
            </div>
        </template>
    </f-card>
</template>

<style lang="scss" scoped>
.awesome-card {
    padding: 1rem;
    max-width: 400px;
    margin: auto;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
}

.result {
    font-weight: bold;
    color: #0066cc;
}
</style>
