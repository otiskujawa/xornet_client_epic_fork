<template>
  <div ref="tag" class="flex items-center gap-2 h-min w-min rounded-full border-1 border-current bg-opacity-10 px-2.5 py-1 ">
    <slot />
    <div>
      {{ text }}
      <p class="w-full opacity-75 whitespace-nowrap text-xs font-light mr-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
const props = defineProps<{text: string; color?: string; description?: string}>();
const tag = ref() as Ref<HTMLDivElement>;

onMounted(() => {
	if (props.color) {
		tag.value.style.color = props.color;
		tag.value.style.backgroundColor = `${props.color}11`;
	}
});

</script>
