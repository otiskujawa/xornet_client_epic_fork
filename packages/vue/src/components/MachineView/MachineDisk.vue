<template>
  <div class="flex items-center gap-2">
    <i-fluency-hdd v-if="disk.type === 'HDD'" class="text-2xl" />
    <i-fluency-ssd v-else class="text-2xl" />
    <div class="flexcol gap-2 justify-between min-w-72">
      <div class="flex justify-between items-center">
        <p>
          {{ disk.mount }}
        </p>
      </div>
      <div class="opacity-35 flex gap-2 justify-between items-center">
        <div class="flex items-center">
          <p>
            {{ `${(disk.used / 1024 / 1024 / 1024).toFixed(2)} GB` }}
          </p>
          <p> / </p>
          <p>
            {{ `${(disk.total / 1024 / 1024 / 1024).toFixed(2)} GB` }}
          </p>
        </div>
        <p>
          {{ ( disk.used / disk.total * 100).toFixed(2) }}% used
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDisk } from "/@/types/api/machine";
defineProps<{disk: IDisk}>();
</script>
