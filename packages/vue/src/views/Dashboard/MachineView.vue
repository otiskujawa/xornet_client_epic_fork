<template>
  <div v-if="machine && machine.ram" class="flexcol bg-black bg-opacity-25 h-full w-full">
    <machine-header :machine="machine" />
    <div class="flexcol gap-2 px-4 overflow-y-scroll">
      <machine-user :user="owner" />
      <machine-processor :machine="machine" />
      <machine-memory-composition :memory="machine.ram" />
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
import MachineUser from "/@/components/MachineView/MachineUser.vue";
import { getMachineOsImageKey } from "/@/services/logic";
import MachineMemoryComposition from "../../components/MachineView/MachineMemoryComposition.vue";
const route = useRoute();
const state = useState();
const machineUuid = computed(() => route.params.uuid as string);

const machine = computed(() => {
	const machine = state.machines.get(machineUuid.value);
	if (machine?.name) {
		useDiscordManager().updatePresence({
			state: machine.os_name?.replaceAll("'", ""),
			details: machine.name,
			largeImageKey: machine.os_name ? getMachineOsImageKey(machine.os_name) : "main_logo",
			largeImageText: machine.os_name,
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
const owner = state.users.get(machine.value?.owner_uuid);
</script>
