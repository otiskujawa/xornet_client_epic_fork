<template>
  <div ref="tag" :class="text ? 'py-1' : 'py-1.5'" class="flex items-center gap-2 h-min w-min rounded-full border-1 border-current bg-opacity-10 px-2 ">
    <slot />
    <div>
      <p
        :class="[
          state.settings.general.label_scale == 0 && 'text-9px',
          state.settings.general.label_scale == 1 && 'text-xs',
          state.settings.general.label_scale == 2 && 'text-sm',
        ]"
      >
        {{ text }}
      </p>
      <p class="w-full opacity-75 text-xs font-normal mr-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useState } from "/@/app";
const props = defineProps<{text: string; color?: string; description?: string}>();
const tag = ref() as Ref<HTMLDivElement>;
const state = useState();

onMounted(() => {
	if (props.color) {
		tag.value.style.color = props.color;
		tag.value.style.backgroundColor = `${props.color}11`;
	}
});

</script>
