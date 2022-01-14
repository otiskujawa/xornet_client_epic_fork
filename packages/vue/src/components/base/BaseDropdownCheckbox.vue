<template>
  <button class="flex items-center justify-between gap-4  p-2 cursor-pointer rounded-2px hover:bg-primary-400 focus:bg-primary-500 focus:text-white hover:text-white text-text" @click="value = !value">
    <div class="flex items-center gap-2">
      <slot />
      {{ text }}
    </div>
    <input v-model="value" type="checkbox" :checked="modelValue">
  </button>
</template>

<script setup lang="ts">
import { useVModel as useModelValue } from "@vueuse/core";
const props = defineProps<{text: string; modelValue: boolean}>();
const emits = defineEmits(["update:modelValue"]);
const value = useModelValue(props, "modelValue", emits);

</script>

<style scoped lang="postcss">

</style>
