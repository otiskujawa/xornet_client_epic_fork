<template>
  <div class="flex items-center gap-2">
    <i-fluency-hdd v-if="disk.type === 'HDD'" class="text-2xl" />
    <i-fluency-ssd v-else class="text-2xl" />
    <div class="flexcol justify-between min-w-56">
      <div class="flex justify-between items-center">
        <p>
          {{ disk.mount }}
        </p>
        <p>
          {{ ( disk.used / disk.total * 100).toFixed(2) }}% used
        </p>
      </div>
      <div class="opacity-25 flex justify-between items-center">
        <p>
          {{ `${(disk.used / 1024 / 1024 / 1024).toFixed(2)} GB` }}
        </p>
        <p> / </p>
        <p>
          {{ `${(disk.total / 1024 / 1024 / 1024).toFixed(2)} GB` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDisk } from "/@/types/api/machine";
defineProps<{disk: IDisk}>();
</script>
