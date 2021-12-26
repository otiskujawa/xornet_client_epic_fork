<template>
  <base-popover open-on-hover arrow>
    <slot />
    <template #content>
      {{text}}
    </template>
  </base-popover>
</template>

<script setup lang="ts">
import BasePopover from './BasePopover.vue';
const props = defineProps<{
  text?: string;
}>()
</script>

<style scoped lang="postcss">
.tooltip {
  @apply rounded-4px text-white text-sm capitalize p-2 invisible bg-primary-500;

  .arrow {
    @apply absolute w-2 h-2 rotate-45 transform bg-primary-500;
  }
  
}

.target:hover + .tooltip {
  @apply visible;
}

</style>