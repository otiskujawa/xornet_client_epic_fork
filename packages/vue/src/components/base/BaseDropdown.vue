<template>
  <base-popover class="text-xs" :open="open">
    <base-button @click="open = !open">
      {{value}}
      <i-fluency-down class="transform transition duration-100" :class="[open && 'rotate-180']" />
    </base-button>
    <template #content>
      <ul class="bg-background p-1 text-xs rounded-4px overflow-hidden space-y-1">
        <li v-for="option in options">
          <button :class="option === value && 'bg-black bg-opacity-20'" class="focus:bg-primary-500 focus:text-white hover:text-white text-text flex flex-col rounded-2px select-none min-w-32 px-3 py-2 hover:bg-primary-400  cursor-pointer"  @click="setValue(option)">
          {{ option }}
          </button> 
        </li>
      </ul>
    </template>
  </base-popover>
  <div v-if="open" @click="open = false" class="fullscreen"></div>
</template>
<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";
import { onKeyStroke, useVModel } from "@vueuse/core";
onKeyStroke("Escape", () => open.value = false);
const props = defineProps<{
  modelValue: string;
  options: string[];
  stayOpen?: boolean;
}>();
const emit = defineEmits(["update:modelValue"])
const value = useVModel(props, "modelValue", emit);

const setValue = (newValue: string) => {
  value.value = newValue; 
  props.stayOpen || (open.value = false);
}

const open = ref(false);
</script>