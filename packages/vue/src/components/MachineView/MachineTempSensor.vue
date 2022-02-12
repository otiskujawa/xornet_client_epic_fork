<template>
  <div class="flex items-center gap-2">
    <i-fluency-temperature class="text-2xl" />
    <div class="flexcol justify-between min-w-56">
      <p>
        {{ sensor.label }}
      </p>
      <p class="opacity-35">
        {{ sensor.value.toFixed(2) }} °C
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITemp } from "/@/types/api/machine";
defineProps<{sensor: ITemp}>();
</script>
