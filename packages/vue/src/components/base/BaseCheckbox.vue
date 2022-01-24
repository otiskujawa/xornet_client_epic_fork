<template>
  <div class="flex items-center gap-2 select-none no-drag">
    <input v-model="isChecked" tabindex="-1" class="check opacity-0 absolute h-4 w-4" :checked="isChecked" type="checkbox">
    <div class="border-primary-500 border-2 text-transparent rounded-2px w-4 h-4 flex flex-shrink-0 justify-center items-center">
      <i-fluency-done />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
	modelValue?: boolean
}>();
const isChecked = useVModel(props, "modelValue", emits);
</script>

<style scoped lang="postcss">
.check[type=checkbox]:checked + div {
  @apply bg-primary-500 text-white border-3;
}
</style>
