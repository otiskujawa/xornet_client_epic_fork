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
      <machine-docker v-if="machine.docker" :docker="machine.docker" />
      <div class="border-2 rounded-4px border-background-400">
        <div class="font-normal bg-background-300 p-2">
          <p class=" ml-2">
            Interface Name
          </p>
        </div>
        <div v-for="iface of machine.network" :key="iface.n" class="px-4 py-1 hover:bg-background-300 flex gap-4 border-1 border-transparent border-t-background-400 items-center">
          <i-fluency-docker v-if="isDockerInterface(iface)" class="text-xl" />
          <i-fluency-firewall v-else-if="isFirewallInterface(iface)" class="text-xl" />
          <i-fluency-switch v-else class="text-xl" />
          <div>
            <div class="flex items-center gap-2">
              <network-interface :iface="iface" :docker="isDockerInterface(iface)" />
              <h1 class="text-lg hover:text-primary-400 hover:underline cursor-pointer">
                {{ iface.n }}
              </h1>
            </div>
            <div class="font-extralight text-text text-opacity-75 flex gap-4">
              <p>
                <span class="">Speed: </span> <strong :class="`${determineInterfaceColor(iface)}`">{{ ~~iface.s }}Mbps</strong>
              </p>
              <p>
                RX:
                {{ bitsToHumanReadable(iface.rx ) }}ps
              </p>
              <p>
                TX:
                {{ bitsToHumanReadable(iface.tx ) }}ps
              </p>
            </div>
          </div>
        </div>
      </div>
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
import MachineDocker from "/@/components/MachineView/MachineDocker.vue";
import NetworkInterface from "/@/components/NetworkInterface.vue";
import { determineInterfaceColor, isDockerInterface, isFirewallInterface } from "/@/services/logic";
const route = useRoute();
const state = useState();
const discord = useDiscord();
const machineUuid = computed(() => route.params.uuid as string);
const machine = computed(() => {
	const machine = state.machines.get(machineUuid.value);
	machine?.name && discord.setCurrentlyWatchingMachine(machine);
	return machine;
});
const bitsToHumanReadable = (bits: number) => {
	const units = ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
	const i = ~~(Math.log(bits) / Math.log(1024));
	return `${(bits / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

</script>
<style scoped lang="postcss">
.bg {
	@apply w-full h-full bg-black bg-opacity-25;
}
</style>
