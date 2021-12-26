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