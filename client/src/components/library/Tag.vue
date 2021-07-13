<template>
  <Tooltip color="#0469e0" :text="title">
    <div class="filterButton" :class="{ enabled }"><Icon :icon="icon" />{{ tag }}</div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

import Icon from "@/components/misc/Icon.vue";
import Tooltip from "@/components/dashboard/Tooltip.vue";

const props = defineProps<{
  tag: string;
  title: string;
  icon: string;
  enabled: boolean;
}>();
</script>

<style lang="postcss" scoped>
.filterButton {
  @apply cursor-pointer 
    select-none 
    text-11px 
    font-semibold 
    rounded-full 
    whitespace-nowrap 
    bg-gray-500 
    px-2 
    py-1.5
    border 
    border-gray-600 
    text-gray-900 
    hover:border-white 
    hover:text-white
    flex
    gap-2
    items-center;
  & .icon {
    @apply w-4;
  }
}

.filterButton.enabled {
  @apply bg-tertiary-100 border border-tertiary-300 text-tertiary-400;
}
</style>
