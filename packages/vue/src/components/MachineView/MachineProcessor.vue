<template>
  <div class="flex gap-2 items-center">
    <i-fluency-processor class="text-2xl" />
    <p>{{ machine.cpu_average_usage }}%</p>
    <p class="opacity-25">
      {{ machine.cpu_model }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IMachine } from "/@/types/api/machine";
defineProps<{machine: IMachine}>();
</script>
