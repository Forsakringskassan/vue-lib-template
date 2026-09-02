<script setup lang="ts">
import { ref } from "vue";
import { FTextField } from "@fkui/vue";
import AwesomeComponent from "../AwesomeComponent.vue";

const namn = ref("Vue lib template");
</script>

<template>
    <div class="container">
        <h1>@forsakringskassan/vue-lib-template</h1>

        <f-text-field v-model="namn" v-validation.required maxlength="100"> Namn </f-text-field>
        <pre>Hello {{ namn }}!</pre>
        <awesome-component></awesome-component>
    </div>
</template>
