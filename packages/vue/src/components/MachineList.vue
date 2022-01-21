<template>
  <div class="w-full h-full overflow-scroll">
    <base-table>
      <template #headers>
        <base-table-header v-if="columns.hostname" :class="sortByKey === 'hostname' && 'active'" text="Hostname" @click="sortBy('hostname')" />
        <base-table-header v-if="columns.cpu_average_usage" :class="sortByKey === 'cpu_average_usage' && 'active'" text="CPU Usage" @click="sortBy('cpu_average_usage')" />
        <base-table-header v-if="columns.cpu_average_speed" :class="sortByKey === 'cpu_average_speed' && 'active'" text="CPU Speed" @click="sortBy('cpu_average_speed')" />
        <base-table-header v-if="columns.ram_usage" :class="sortByKey === 'ram_usage' && 'active'" text="RAM Usage" @click="sortBy('ram_usage')" />
        <base-table-header v-if="columns.gpu_usage" :class="sortByKey === 'gpu_usage' && 'active'" text="GPU Usage" @click="sortBy('gpu_usage')" />
        <base-table-header v-if="columns.gpu_power_usage" :class="sortByKey === 'gpu_power_usage' && 'active'" text="GPU Power Usage" @click="sortBy('gpu_power_usage')" />
        <base-table-header v-if="columns.network_switch" :class="sortByKey === 'network_switch' && 'active'" text="Network Switch" @click="sortBy('network_switch')" />
        <base-table-header v-if="columns.download" :class="sortByKey === 'total_download' && 'active'" text="Download" @click="sortBy('total_download')" />
        <base-table-header v-if="columns.upload" :class="sortByKey === 'total_upload' && 'active'" text="Upload" @click="sortBy('total_upload')" />
        <base-table-header v-if="columns.temperature" :class="sortByKey === 'temperature' && 'active'" text="Temperature" @click="sortBy('temperature')" />
        <base-table-header v-if="columns.public_ip" :class="sortByKey === 'public_ip' && 'active'" text="public IP" @click="sortBy('public_ip')" />
        <base-table-header v-if="columns.process_count" :class="sortByKey === 'process_count' && 'active'" text="Process Count" @click="sortBy('process_count')" />
        <base-table-header v-if="columns.owner" :class="sortByKey === 'owner' && 'active'" text="Owner" @click="sortBy('owner')" />
        <base-table-header v-if="columns.action" :class="sortByKey === 'action' && 'active'" text="Action" @click="sortBy('action')" />
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
                class="w-5px h-5px rounded-full bg-active text-opacity-100 mr-1"
              />
              <div
                v-else
                class="w-5px h-5px rounded-full bg-white text-white opacity-15 mr-1"
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
            <machine-stat :value="`${machine.ram_used_gb?.toFixed(2)} / ${machine.ram_total_gb?.toFixed(2)}`" suffix="GB">
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
const machines = computed(() => state.machines.getAll()
// Compute a bunch of properties so we don't have to do it multiple times
	.map((machine) => {
		return ({
			...machine,
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
			case "cpu_average_usage":
				comparison = (a.cpu_average_usage || "") < (b.cpu_average_usage || "");
				break;
			case "cpu_average_speed":
				comparison = (a.cpu_average_speed || "") < (b.cpu_average_speed || "");
				break;
			case "ram_usage_ratio":
				comparison = (a.ram.used / a.ram.total || "") < (b.ram.used / b.ram.total || "");
				break;
			case "network_switch":
				comparison = (a.network?.length || "") < (b.network?.length || "");
				break;
			case "total_download":
				comparison = (a.total_download || "") < (b.total_download || "");
				break;
			case "total_upload":
				comparison = (a.total_upload || "") < (b.total_upload || "");
				break;
			case "temperature":
				comparison = (a.temperature || "") < (b.temperature || "");
				break;
			case "gpu_usage":
				comparison = (a.gpu?.gpu_usage || "") < (b.gpu?.gpu_usage || "");
				break;
			case "gpu_power_usage":
				comparison = (a.gpu?.power_usage || "") < (b.gpu?.power_usage || "");
				break;
			case "public_ip":
				comparison = (a.public_ip || "") < (b.public_ip || "");
				break;
			case "process_count":
				comparison = (a.process_count || "") < (b.process_count || "");
				break;
			case "owner":
				comparison = (a.owner.username.toLowerCase() || "") > (b.owner.username.toLowerCase() || "");
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
.bloom {
  box-shadow: 0px 0px 6px #00FF67;
}
</style>
