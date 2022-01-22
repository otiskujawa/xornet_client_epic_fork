<template>
  <div class="w-full h-full overflow-scroll">
    <base-table>
      <template #headers>
        <template v-for="column of Object.keys(columns)" :key="column">
          <base-table-header v-if="(columns as any)[column]" :class="sortByKey === column && 'active'" :text="column" @click="sortBy(column)" />
        </template>
      </template>
      <template #rows>
        <tr
          v-for="machine of machines"
          :key="machine.hardware_uuid"
          @mouseenter="SoundManager.playHover()"
        >
          <th v-if="columns.hostname">
            <machine-stat :value="machine.name">
              <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.os_name?.replace(/'/g, '')" />
              <div
                v-if="machine.is_online"
                :class="state.settings.enableBloom.value && 'bloom'"
                class="w-5px h-5px rounded-full bg-active mr-1"
              />
              <div
                v-else
                class="w-5px h-5px rounded-full bg-white text-white opacity-50 mr-1"
              />
            </machine-stat>
          </th>
          <th v-if="columns.cpu_average_usage">
            <machine-stat :value="machine.cpu_average_usage?.toFixed(2)" suffix="%">
              <i-fluency-processor />
            </machine-stat>
          </th>
          <th v-if="columns.cpu_average_speed">
            <machine-stat :value="machine.cpu_average_speed?.toFixed(2)" suffix="MHz">
              <i-fluency-speedometer />
            </machine-stat>
          </th>
          <th v-if="columns.ram_usage">
            <machine-stat :value="machine.ram_used_gb ? `${machine.ram_used_gb?.toFixed(2)} / ${machine.ram_total_gb?.toFixed(2)}` : undefined" suffix="GB">
              <i-fluency-memory />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_usage">
            <machine-stat :value="machine.gpu?.gpu_usage" suffix="%">
              <i-fluency-video-card />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_power_usage">
            <machine-stat :value="machine.gpu?.power_usage" suffix="mW">
              <i-fluency-lightning-bolt />
            </machine-stat>
          </th>
          <th v-if="columns.network_switch">
            <network-switch v-if="machine.network" :interfaces="machine.network" />
          </th>
          <th v-if="columns.download">
            <machine-stat :value="machine.total_download?.toFixed(2)" suffix="Mbps">
              <i-fluency-down />
            </machine-stat>
          </th>
          <th v-if="columns.upload">
            <machine-stat :value="machine.total_upload?.toFixed(2)" suffix="Mbps">
              <i-fluency-up />
            </machine-stat>
          </th>
          <th v-if="columns.temperature">
            <machine-stat :value="machine.temps?.[0].value?.toFixed(2)" suffix="°C">
              <i-fluency-temperature />
            </machine-stat>
          </th>
          <th v-if="columns.public_ip">
            <machine-stat :value="machine.public_ip">
              <i-fluency-ipv6 />
            </machine-stat>
          </th>
          <th v-if="columns.process_count">
            <machine-stat :value="machine.process_count">
              <i-fluency-processes />
            </machine-stat>
          </th>
          <th v-if="columns.host_uptime">
            <machine-stat :value="formatEpoch(machine.host_uptime)">
              <i-fluency-clock />
            </machine-stat>
          </th>
          <th v-if="columns.reporter_uptime">
            <machine-stat :value="formatEpoch(machine.reporter_uptime)">
              <i-fluency-clock />
            </machine-stat>
          </th>
          <th v-if="columns.reporter_version">
            <machine-stat :value="`v${machine.reporter_version}`">
              <i-fluency-upgrade />
            </machine-stat>
          </th>
          <th v-if="columns.owner">
            <div class="flex items-center gap-3">
              <avatar :user="machine.owner" class="w-16px" />
              {{ machine.owner?.username }}
            </div>
          </th>
          <th v-if="columns.action">
            <base-confirmation-dialog v-if="machine.owner_uuid === state.users.getMe().uuid" confirmation-text="Are you sure you want to delete this machine?" @confirm="deleteMachine(machine.uuid)">
              <i-fluency-trash />
            </base-confirmation-dialog>
          </th>
        </tr>
      </template>
    </base-table>
  </div>
</template>

<script setup lang="ts">
import type { uuid } from "types/api";
import { computed, ref } from "vue";
import { SoundManager } from "../services/SoundManager";
import { useState } from "../services/state";
import BaseTable from "./base/BaseTable.vue";
import MachineStat from "./MachineStat.vue";
import NetworkSwitch from "./NetworkSwitch.vue";
import Avatar from "./user/Avatar.vue";
import BaseConfirmationDialog from "./base/BaseConfirmationDialog.vue";
import BaseTableHeader from "./base/BaseTableHeader.vue";
const state = useState();
const columns = computed(() => state.settings.columns);
const sortByKey = ref("hostname");
const sortBy = (field: string) => sortByKey.value = field;

const padNumber = (time: number) => {
	const floored = ~~time;
	return floored > 9 ? floored : `0${floored}`;
};

const formatEpoch = (ms?: number) => {
	if (!ms) return undefined;
	const days = ~~(ms / (24 * 60 * 60 * 1000));
	const daysms = ms % (24 * 60 * 60 * 1000);
	const hours = ~~(daysms / (60 * 60 * 1000));
	const hoursms = ms % (60 * 60 * 1000);
	const minutes = ~~(hoursms / (60 * 1000));
	const minutesms = ms % (60 * 1000);
	const sec = ~~(minutesms / 1000);
	return `${padNumber(days)}:${padNumber(hours)}:${padNumber(minutes)}:${padNumber(sec)}`;
};

const machines = computed(() => state.machines.getAll()
// Compute a bunch of properties so we don't have to do it multiple times
	.map((machine) => {
		return ({
			...machine,
			ram_used_gb: (machine.ram?.used || 0) / 1024 / 1024,
			ram_total_gb: (machine.ram?.total || 0) / 1024 / 1024,
			temperature: machine.temps?.[0].value,
			is_online: machine.status === 2,
			owner: state.users.get(machine.owner_uuid),
		});
	})
// This is for the filter input so user's can quickly search through machines
	.filter(machine =>
		machine.name.toLowerCase().includes(state.machines.filterText.value)
    || state.users.get(machine.owner_uuid).username.toLowerCase().includes(state.machines.filterText.value),
	)
// This is so you can hide offline machines
	.filter(machine => state.settings.showOfflineMachines.value ? machine : machine.is_online)
// This makes it so you can see only your own machines
	.filter(machine => state.settings.showOwnedMachinesOnly.value ? machine.owner_uuid === state.users.getMe().uuid : machine)
// This switch is what sorts the columns
	.sort((a, b) => {
		let comparison = false;

		switch (sortByKey.value) {
			case "hostname":
				comparison = (a.hostname?.toLowerCase() || "") > (b.hostname?.toLowerCase() || "");
				break;
			case "ram_usage":
				comparison = a.ram_used_gb / a.ram_total_gb < b.ram_used_gb / b.ram_total_gb;
				break;
			case "network_switch":
				comparison = (a.network?.length || "") < (b.network?.length || "");
				break;
			case "gpu_usage":
				comparison = (a.gpu?.gpu_usage || "") < (b.gpu?.gpu_usage || "");
				break;
			case "gpu_power_usage":
				comparison = (a.gpu?.power_usage || "") < (b.gpu?.power_usage || "");
				break;
			case "owner":
				comparison = (a.owner.username.toLowerCase() || "") > (b.owner.username.toLowerCase() || "");
				break;
			case "cpu_average_usage":
			case "cpu_average_speed":
			case "total_download":
			case "total_upload":
			case "temperature":
			case "public_ip":
			case "reporter_version":
			case "host_uptime":
			case "reporter_uptime":
			case "process_count":
				comparison = (a[sortByKey.value] || "") < (b[sortByKey.value] || "");
				break;
			default:
				comparison = (a.hostname?.toLowerCase() || "") > (b.hostname?.toLowerCase() || "");
				break;
		}
		return comparison ? -1 : 1;
	})
// This puts all the offline machines at the bottom
	.sort(a => a.is_online ? -1 : 1));

const deleteMachine = async(uuid: uuid) => {
	const { machines } = useState();
	await machines.deleteMachine(uuid);
};
</script>

<style scoped lang="postcss">
th {
  @apply text-text;
}
.bloom {
  box-shadow: 0px 0px 6px #00FF67;
}
</style>
