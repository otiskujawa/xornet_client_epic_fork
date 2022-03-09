<template>
  <div class="flex items-center gap-2 my-1">
    <i-fluency-hdd v-if="disk.type === 'HDD'" class="text-2xl" />
    <i-fluency-ssd v-else class="text-2xl" />
    <div class="flexcol justify-between min-w-72">
      <div class="flex justify-between items-center">
        <p>
          {{ disk.mount }}
        </p>
      </div>
      <div class="opacity-35 flex justify-between items-center">
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
      <div class="mt-1 relative flex items-center bg-primary-400 bg-opacity-10 w-full min-h-1 h-1">
        <div class="border-transparent border-r-primary-400 border-1px h-full bg-primary-400 bg-opacity-50 duration-100 " :style="`width: ${ disk.used / disk.total * 100 }%`" />
        <div class="w-full h-full duration-100" :style="`width: ${ 100 - (disk.used / disk.total * 100) }%`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDisk } from "/@/types/api/machine";
defineProps<{disk: IDisk}>();
</script>
