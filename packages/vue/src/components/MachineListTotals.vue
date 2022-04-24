<template>
  <div class="w-full px-4">
    <base-graph :series="networkSeries" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { computed, onMounted, ref, watch } from "vue";

import type { IMachine } from "/@/types/api/machine";
import BaseGraph from "./base/BaseGraph.vue";

const CHART_BUFFER = 480;
const uploads: Ref<number[]> = ref(new Array(CHART_BUFFER).fill(0));
const downloads: Ref<number[]> = ref(new Array(CHART_BUFFER).fill(0));

const networkSeries = computed(() => [
	{
		name: "upload",
		type: "area",
		data: uploads.value,
	},
	{
		name: "download",
		type: "area",
		data: downloads.value,
	},
]);

const props = defineProps<{machines: (IMachine & {ram_used_gb: number; ram_total_gb: number})[]}>();

setInterval(() => {
	downloads.value.push(props.machines.reduce((a, b) => a = a + (b.td! || 0), 0));
	downloads.value.shift();
	uploads.value.push(props.machines.reduce((a, b) => a = a + (b.tu! || 0), 0));
	uploads.value.shift();
}, 1000);

// const totalRamUsedOverall = computed(() => props.machines.reduce((a, b) => a = a + b.ram_used_gb, 0));
// const totalRamTotalOverall = computed(() => props.machines.reduce((a, b) => a = a + b.ram_total_gb, 0));

// const totalStorage = computed(() => props.machines.reduce((a, b) => b.disks ? a = a + b.disks.reduce((a, b) => a = a + b.total || 0, 0) : a, 0));
// const totalGpuWatts = computed(() => props.machines.reduce((a, b) => a = a + (b.gpu?.power_usage || 0), 0));
</script>
