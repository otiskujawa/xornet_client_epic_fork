<template>
  <base-popover open-on-hover :placement="placement" class="tooltip" :class="borderless ? '' : 'bg-tooltip-background p-2' ">
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
	borderless?: boolean
}>();
</script>

<style lang="postcss" >
.tooltip {
  @apply z-2;
}
.tooltip.popover {
  @apply text-tooltip-text shadow-xl;
}

</style>
