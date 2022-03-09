<template>
  <div class="flex gap-1 pl-2 h-full">
    <div v-for="i of processor.usage.length" :key="i" class="flexcol justify-end w-2 bg-primary-400 bg-opacity-25 h-full rounded-full">
      <div class="duration-250 bg-primary-400 w-full rounded-full" :style="`height: ${processor.usage[i-1]}%`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICPU } from "/@/types/api/machine";
const props = defineProps<{processor: ICPU}>();

</script>

<style scoped lang="postcss">

</style>
