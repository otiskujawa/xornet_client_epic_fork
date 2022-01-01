<template>
  <label class="relative inline-block w-13 h-6">
    <input v-model="value" type="checkbox" class="hidden" :checked="modelValue">
    <span class="slider round" />
  </label>
</template>

<script setup lang="ts">
import { useVModel as useModelValue } from "@vueuse/core";
const props = defineProps<{modelValue: boolean}>();
const emits = defineEmits(["update:modelValue"]);
const value = useModelValue(props, "modelValue", emits);
</script>

<style scoped lang="postcss">
.slider {
  @apply bg-background-500 rounded-full  duration-100 absolute cursor-pointer top-0 left-0 right-0 bottom-0;
}

.slider:before {
  @apply absolute  rounded-full w-4 h-4 left-1 bottom-1 bg-white transition duration-100;
  content: "";
}

input:checked + .slider {
  @apply bg-primary-500;
}

input:checked + .slider:before {
  @apply transform translate-x-26px;
}

</style>
