<template>
  <div class="grid gap-x-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
    <machine-temp-sensor v-for="(sensor, i) of sensors" :key="i" :sensor="sensor" />
  </div>
</template>

<script setup lang="ts">
import MachineTempSensor from "./MachineTempSensor.vue";
import type { ITemp } from "/@/types/api/machine";
defineProps<{sensors: ITemp[]}>();
</script>
