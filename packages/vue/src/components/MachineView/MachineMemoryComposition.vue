<template>
  <div class="flexcol gap-2">
    <div class="justify-between flex gap-2 items-center">
      <p>Memory Composition</p>
      <div class="flex gap-2 items-center">
        <p>Used</p>
        <div class="legend bg-primary-400 bg-opacity-25" />
        <p>Free</p>
        <div class="legend bg-primary-400 bg-opacity-5" />
      </div>
    </div>
    <div class="relative flex items-center bg-primary-400 bg-opacity-5 border-1 border-primary-400 w-full min-h-12 h-12">
      <div class="whitespace-nowrap border-transparent border-r-primary-400 border-1px  flex items-center justify-center h-full bg-primary-400 bg-opacity-25 duration-100 " :style="`width: ${ memory.used / memory.total * 100 }%`">
        {{ (memory.used / 1024 / 1024).toFixed(2) }} GB
      </div>
      <div class="whitespace-nowrap flex items-center w-full justify-center h-full duration-100" :style="`width: ${ 100 - (memory.used / memory.total * 100) }%`">
        {{ ((memory.total - memory.used) / 1024 / 1024).toFixed(2) }} GB
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRAM } from "/@/types/api/machine";
defineProps<{memory: IRAM}>();

</script>

<style scoped>
.legend {
  @apply rounded-full w-4 h-4 border-1 border-primary-400;
}
</style>
