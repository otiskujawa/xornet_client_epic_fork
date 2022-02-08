<template>
  <base-popover open-on-hover arrow :placement="placement" class="tooltip">
    <slot />
    <template #content>
      {{ text }}
      <slot name="content" />
    </template>
  </base-popover>
</template>

<script setup lang="ts">
import type { BasePlacement } from "@floating-ui/core";
import BasePopover from "/@/components/base/BasePopover.vue";
defineProps<{
	text?: string
	placement?: BasePlacement
}>();
</script>

<style lang="postcss" >
.tooltip {
  @apply z-2;
}
.tooltip.popover {
  @apply p-2 bg-tooltip-background text-tooltip-text shadow-xl;
}

.tooltip .arrow {
  @apply absolute w-2 h-2 rotate-45 transform bg-tooltip-background;
}
</style>
