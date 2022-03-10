<template>
  <div
    v-if="machine.status === 2"
    :class="state.settings.general.enable_bloom && 'bloom'"
    class="w-5px h-5px rounded-full bg-active mr-1"
  />
  <div
    v-else
    class="w-5px h-5px rounded-full bg-white text-white opacity-50 mr-1"
  />
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import type { IMachine } from "/@/types/api/machine";
const state = useState();
defineProps<{machine: IMachine}>();
</script>

<style scoped lang="postcss">
.bloom {
  box-shadow: 0px 0px 6px #00FF67;
}
</style>
