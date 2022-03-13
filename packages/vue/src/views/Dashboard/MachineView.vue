<template>
  <div class="flexcol bg">
    <machine-header :machine="machine" />
    <div v-if="machine && machine.ram" class="flexcol bg gap-2 overflow-hidden overflow-y-visible p-4">
      <machine-processor-info :machine="machine" />
      <machine-processor-usage-bars :processor="machine.cpu!" />
      <machine-memory-composition :memory="machine.ram" :swap="machine.swap" />
      <machine-network-traffic :total-download="machine.td!" :total-upload="machine.tu!" />
      <machine-disks :disks="machine.disks!" />
      <machine-temp-sensors :sensors="machine.temps!" />
    </div>
    <base-loading-spinner v-else text="Waiting for data from this machine..." />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MachineMemoryComposition from "/@/components/MachineView/MachineMemoryComposition.vue";
import { useDiscord, useState } from "/@/app";
import BaseLoadingSpinner from "/@/components/base/BaseLoadingSpinner.vue";
import MachineHeader from "/@/components/MachineView/MachineHeader.vue";
import MachineNetworkTraffic from "/@/components/MachineView/MachineNetworkTraffic.vue";
import MachineProcessorUsageBars from "/@/components/MachineView/MachineProcessorUsageBars.vue";
import MachineProcessorInfo from "/@/components/MachineView/MachineProcessorInfo.vue";
import MachineDisks from "/@/components/MachineView/MachineDisks.vue";
import MachineTempSensors from "/@/components/MachineView/MachineTempSensors.vue";
const route = useRoute();
const state = useState();
const discord = useDiscord();
const machineUuid = computed(() => route.params.uuid as string);
const machine = computed(() => {
	const machine = state.machines.get(machineUuid.value);
	machine?.name && discord.setCurrentlyWatchingMachine(machine);
	return machine;
});
</script>
<style scoped lang="postcss">
.bg {
	@apply w-full h-full bg-black bg-opacity-25;
}
</style>
