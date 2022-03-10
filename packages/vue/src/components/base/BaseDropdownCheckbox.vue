<template>
  <button class="flex capitalize items-center justify-between gap-4  p-2 cursor-pointer rounded-2px hover:bg-background-300 focus:bg-background-500 focus:text-white hover:text-white text-left text-text" @click="value = !value; soundManager.playClick()" @mouseenter="soundManager.playHover()">
    <div class="flex items-center gap-2">
      <slot />
      {{ text }}
    </div>
    <base-checkbox v-model="value" type="checkbox" :checked="modelValue" />
  </button>
</template>

<script setup lang="ts">
import { useVModel as useModelValue } from "@vueuse/core";
import { useSoundManager } from "/@/app";
import BaseCheckbox from "/@/components/base/BaseCheckbox.vue";
const soundManager = useSoundManager();
const props = defineProps<{text: string; modelValue: boolean}>();
const emits = defineEmits(["update:modelValue"]);
const value = useModelValue(props, "modelValue", emits);
</script>
