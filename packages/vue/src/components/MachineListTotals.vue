<template>
  <div class="opacity-50 w-full px-4">
    <p>Total RAM: {{ totalRamUsedOverall.toFixed(2) }} GB / {{ totalRamTotalOverall.toFixed(2) }} GB</p>
    <p>Total Download / Upload: {{ totalNetworkDown.toFixed(2) }} Mbps / {{ totalNetworkUp.toFixed(2) }} Mbps</p>
    <p>Total Storage: {{ (totalStorage / 1024 / 1024 / 1024 / 1024).toFixed(2) }} TB</p>
    <p>Total GPU watts: {{ (totalGpuWatts / 1000).toFixed(2) }} watts</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IMachine } from "/@/types/api/machine";
const props = defineProps<{machines: (IMachine & {ram_used_gb: number; ram_total_gb: number})[]}>();
const totalRamUsedOverall = computed(() => props.machines.reduce((a, b) => a = a + b.ram_used_gb, 0));
const totalRamTotalOverall = computed(() => props.machines.reduce((a, b) => a = a + b.ram_total_gb, 0));
const totalNetworkDown = computed(() => props.machines.reduce((a, b) => a = a + (b.total_download! || 0), 0));
const totalNetworkUp = computed(() => props.machines.reduce((a, b) => a = a + (b.total_upload! || 0), 0));
const totalStorage = computed(() => props.machines.reduce((a, b) => b.disks ? a = a + b.disks.reduce((a, b) => a = a + b.total || 0, 0) : a, 0));
const totalGpuWatts = computed(() => props.machines.reduce((a, b) => a = a + (b.gpu?.power_usage || 0), 0));
</script>
