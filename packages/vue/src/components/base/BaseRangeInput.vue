<template>
  <input v-model="value" type="range">
</template>

<script setup lang="ts">
import { useVModel as useModelValue } from "@vueuse/core";
const props = defineProps<{modelValue: any}>();
const emits = defineEmits(["update:modelValue"]);
const value = useModelValue(props, "modelValue", emits);
</script>
