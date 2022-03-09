<template>
  <div class="relative flex items-center border-1 border-primary-400 w-192 min-h-12 h-12">
    <div class="whitespace-nowrap border-transparent border-r-primary-400 border-1px  flex items-center justify-center h-full bg-primary-400 bg-opacity-25 duration-100 " :style="`width: ${ memory.used / memory.total * 100 }%`">
      {{ (memory.used / 1024 / 1024).toFixed(2) }} GB
    </div>
    <div class="whitespace-nowrap flex items-center w-full justify-center h-full duration-100" :style="`width: ${ 100 - (memory.used / memory.total * 100) }%`">
      {{ ((memory.total - memory.used) / 1024 / 1024).toFixed(2) }} GB
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRAM } from "/@/types/api/machine";
defineProps<{memory: IRAM}>();
</script>
