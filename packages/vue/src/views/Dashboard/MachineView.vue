<template>
  <div v-if="machine" class="flexcol bg-black bg-opacity-25 h-full w-full">
    <machine-header :machine="machine" />
    <div class="flexcol gap-2 px-4 overflow-y-scroll">
      <machine-processor :machine="machine" />
      <machine-disk v-for="disk of machine.disks" :key="disk.mount" :disk="disk" />
      <machine-temp-sensor v-for="sensor of machine.temps" :key="sensor.label" :sensor="sensor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDiscordManager, useState } from "/@/app";
import MachineHeader from "/@/components/MachineView/MachineHeader.vue";
import MachineDisk from "/@/components/MachineView/MachineDisk.vue";
import MachineProcessor from "/@/components/MachineView/MachineProcessor.vue";
import MachineTempSensor from "/@/components/MachineView/MachineTempSensor.vue";
import NetworkSwitch from "/@/components/NetworkSwitch.vue";
const route = useRoute();
const state = useState();
const machineUuid = computed(() => route.params.uuid as string);
const machine = computed(() => {
	const machine = state.machines.get(machineUuid.value);
	if (machine?.name) {
		useDiscordManager().updatePresence({
			state: machine.os_name?.replaceAll("'", ""),
			details: machine.name,
			largeImageKey: "main_logo",
			largeImageText: "Xornet Cloud",
			smallImageKey: "viewing",
			smallImageText: `Viewing ${machine.name}`,
			buttons: [
				{
					label: "See Machine",
					url: `https://xornet.cloud/#/dashboard/machine/${machine.uuid}`,
				},
				{
					label: "GitHub",
					url: "https://github.com/xornet-cloud/",
				},
			],
		});
	}

	return machine;
});
</script>
