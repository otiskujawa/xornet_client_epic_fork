<template>
  <div class="flexcol gap-2">
    <div class="justify-between flex gap-2 items-center">
      <p>Memory Composition</p>
      <div class="flex gap-2 items-center">
        <p>Used</p>
        <div class="legend bg-active bg-opacity-25" />
        <p v-if="swap">
          Swap
        </p>
        <div v-if="swap" class="swap legend bg-active bg-opacity-25" />
        <p>Free</p>
        <div class="legend bg-active bg-opacity-15" />
      </div>
    </div>
    <div class="relative whitespace-nowrap flex items-center bg-active bg-opacity-15 border-1 border-active w-full min-h-12 h-12">
      <div class="edgeBorder flex items-center justify-center h-full bg-active bg-opacity-25 duration-250 " :style="`width: ${ memory.used / totalMemoryCombined * 100 }%`">
        {{ (memory.used / 1024 / 1024).toFixed(2) }} GB
      </div>
      <div v-if="swap" class="edgeBorder swap flex items-center w-full justify-center h-full duration-250" :style="`width: ${ swap.total / totalMemoryCombined * 100 }%`">
        {{ (swap.total / 1024 / 1024).toFixed(2) }} GB
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

</script>

<style scoped>
.legend {
  @apply rounded-full w-4 h-4 border-1 border-active;
}

.edgeBorder {
  @apply border-transparent border-r-active border-1px;
}

.swap {
  background-image: repeating-linear-gradient(-66deg,
    transparent,
    transparent 2.5px,
    rgba(var(--color-active), 0.25) 2.5px,
    rgba(var(--color-active), 0.25) 5px);
}
</style>
