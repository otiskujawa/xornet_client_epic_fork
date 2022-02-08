<template>
  <base-popover class="text-xs no-drag" :open="open">
    <base-button :transparent="transparent" @click="open = !open">
      <slot name="icon" />
      {{ text ? text : value }}
      <i-fluency-down
        class="transform transition duration-100"
        :class="[open && 'rotate-180']"
      />
    </base-button>
    <template #content>
      <ul v-if="options" class="bg-background-400 p-1 text-xs rounded-4px overflow-hidden space-y-1">
        <li v-for="option in options" :key="option">
          <button
            :class="option === value && 'bg-black bg-opacity-20'"
            class="focus:bg-primary-500 focus:text-white hover:text-white text-text flexcol rounded-2px select-none min-w-32 px-3 py-2 hover:bg-primary-400 cursor-pointer"
            @click="setValue(option)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
      <div v-else class="bg-background-500 flexcol p-1 text-xs rounded-4px overflow-hidden space-y-1">
        <slot name="options" />
      </div>
    </template>
  </base-popover>
  <div v-if="open" class="fullscreen" @click="open = false" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { onKeyStroke, useVModel } from "@vueuse/core";
import BasePopover from "./BasePopover.vue";
import BaseButton from "./BaseButton.vue";
const open = ref(false);

onKeyStroke("Escape", () => (open.value = false));
const props = defineProps<{
	modelValue?: any
	options?: any[]
	text?: string
	stayOpen?: boolean
	transparent?: boolean
}>();
const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);

const setValue = (newValue: string) => {
	value.value = newValue;
	props.stayOpen || (open.value = false);
};

</script>
