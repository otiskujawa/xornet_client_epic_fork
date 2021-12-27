<template>
  <base-popover open-on-hover arrow class="tooltip">
    <slot />
    <template #content>
      {{ text }}
    </template>
  </base-popover>
</template>

<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
defineProps<{
	text?: string
}>();
</script>

<style lang="postcss" >
.tooltip.popover {
  @apply p-2 bg-tooltip-background text-tooltip-text shadow-xl;
}

.tooltip .arrow {
  @apply absolute w-2 h-2 rotate-45 transform bg-tooltip-background;
}
</style>
