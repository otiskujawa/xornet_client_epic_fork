<script setup lang="ts">
import { onKeyStroke, useVModel } from "@vueuse/core";
import PopInTransition from "../shared/transitions/PopInTransition.vue";
import { SoundManager } from "/@/services/SoundManager";
const props = defineProps<{
	modelValue?: boolean
	unsized?: boolean
}>();
const emit = defineEmits(["update:modelValue"]);
const open = useVModel(props, "modelValue", emit);
const close = () => {
	open.value = false;
	open.value && SoundManager.playEscape();
};
onKeyStroke("Escape", () => close());
</script>

<template>
  <teleport to="#app">
    <pop-in-transition>
      <div
        v-if="open"
        class="bg-white flex h-full bg-opacity-5 w-full top-0 left-0 z-50 items-center align-center justify-center fixed"
        @mousedown="close()"
      >
        <div
          class="shadow-xl rounded-8px overflow-hidden"
          :class="{ sized: !unsized }"
          v-bind="$attrs"
          @mousedown.stop=""
        >
          <slot />
        </div>
      </div>
    </pop-in-transition>
  </teleport>
</template>

<style lang="postcss" scoped>
.sized {
	@apply w-1/2 sm:w-80 lg:w-120;
}
</style>
