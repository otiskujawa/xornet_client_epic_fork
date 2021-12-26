<template>
  <base-popover class="text-xs"  :open="open">
    <base-button @click="open = true">
      {{value}}
    </base-button>
    <template #content>
      <ul class="bg-black p-1 text-xs rounded-6px overflow-hidden space-y-1">
        <li :class="option === value && 'bg-dark-300'" class="rounded-4px select-none w-32 px-3 py-2 hover:bg-primary-400 text-white cursor-pointer" v-for="option in options" @click="setValue(option)">
          {{ option }}
        </li>
      </ul>
    </template>
  </base-popover>
  <div v-if="open" @click="open = false" class="fullscreen"></div>
</template>

<!-- https://windicss.org/ -->

<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
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

<style scoped lang="postcss">



</style>
