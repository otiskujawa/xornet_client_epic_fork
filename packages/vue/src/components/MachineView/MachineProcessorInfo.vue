<template>
  <div class="flex gap-2 items-center">
    <i-fluency-processor class="text-2xl" />
    <p>{{ machine.cau }}%</p>
    <p class="opacity-35">
      {{ machine.cpu_model }}
    </p>
    <p class="opacity-75 text-primary-400">
      (current @ {{ (machine.cas! / 1000).toFixed(2) }}GHz)
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IMachine } from "/@/types/api/machine";
defineProps<{machine: IMachine}>();
</script>
