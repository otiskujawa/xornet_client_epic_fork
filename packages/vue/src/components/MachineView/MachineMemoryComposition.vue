<template>
  <div class="flexcol gap-2">
    <div class="justify-between flex gap-2 items-center">
      <p>Memory Composition</p>
      <div class="flex gap-2 items-center">
        <p v-if="isShowingSwap">
          Swap
        </p>
        <div v-if="isShowingSwap" class="swap legend bg-primary-400 bg-opacity-25" />
        <p>Used</p>
        <div class="legend bg-primary-400 bg-opacity-25" />
        <p>Free</p>
        <div class="legend bg-primary-400 bg-opacity-5" />
      </div>
    </div>
    <div class="relative whitespace-nowrap flex items-center bg-primary-400 bg-opacity-5 border-1 border-primary-400 w-full min-h-12 h-12">
      <div v-if="isShowingSwap" class="edgeBorder swap flex items-center w-full justify-center h-full duration-250" :style="`width: ${ swap!.used / swap!.total * 100 }%`">
        {{ (swap!.used / 1024 / 1024).toFixed(2) }} GB
      </div>
      <div class="edgeBorder flex items-center justify-center h-full bg-primary-400 bg-opacity-25 duration-250 " :style="`width: ${ memory.used / memory.total * 100 }%`">
        {{ (memory.used / 1024 / 1024).toFixed(2) }} GB
      </div>
      <div class="flex items-center w-full justify-center h-full duration-250" :style="`width: ${ 100 - (swap ? ((memory.used / totalMemoryCombined * 100) + (swap.total / totalMemoryCombined * 100)) : ((memory.used / totalMemoryCombined * 100))) }%`">
        {{ ((memory.total - memory.used) / 1024 / 1024).toFixed(2) }} GB
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IRAM, ISwap } from "/@/types/api/machine";
const props = defineProps<{memory: IRAM; swap?: ISwap}>();
const totalMemoryCombined = computed(() => props.swap?.total ? props.memory.total + props.swap?.total : props.memory.total);
const isShowingSwap = computed(() => props.swap && props.swap.used / 1024 / 1024 > 0);
</script>

<style scoped lang="postcss">
.legend {
  @apply rounded-full w-4 h-4 border-1 border-primary-400;
}

.edgeBorder {
  @apply border-transparent border-r-primary-400 border-1px;
}

.swap {
  background-image: repeating-linear-gradient(-66deg,
    transparent,
    transparent 2.5px,
    rgba(var(--color-primary-400), 0.25) 2.5px,
    rgba(var(--color-primary-400), 0.25) 5px);
}
</style>
