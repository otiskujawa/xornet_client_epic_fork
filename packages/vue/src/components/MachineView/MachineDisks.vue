<template>
  <div class="grid gap-x-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full">
    <machine-disk v-for="disk of disks" :key="disk.mount" :disk="disk" />
  </div>
</template>

<script setup lang="ts">
import MachineDisk from "./MachineDisk.vue";
import type { IDisk } from "/@/types/api/machine";
defineProps<{disks: IDisk[]}>();
</script>
