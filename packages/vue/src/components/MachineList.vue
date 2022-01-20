<template>
  <div class="w-full h-full overflow-scroll">
    <base-table>
      <template #headers>
        <base-table-header v-if="columns.hostname" :class="shortByKey === 'hostname' && 'active'" text="Hostname" @click="sortBy('hostname')" />
        <base-table-header v-if="columns.cpu_usage" :class="shortByKey === 'cpu_usage' && 'active'" text="CPU Usage" @click="sortBy('cpu_usage')" />
        <base-table-header v-if="columns.cpu_speed" :class="shortByKey === 'cpu_speed' && 'active'" text="CPU Speed" @click="sortBy('cpu_speed')" />
        <base-table-header v-if="columns.ram_usage" :class="shortByKey === 'ram_usage' && 'active'" text="RAM Usage" @click="sortBy('ram_usage')" />
        <base-table-header v-if="columns.gpu_usage" :class="shortByKey === 'gpu_usage' && 'active'" text="GPU Usage" @click="sortBy('gpu_usage')" />
        <base-table-header v-if="columns.gpu_power_usage" :class="shortByKey === 'gpu_power_usage' && 'active'" text="GPU Power Usage" @click="sortBy('gpu_power_usage')" />
        <base-table-header v-if="columns.network_switch" :class="shortByKey === 'network_switch' && 'active'" text="Network Switch" @click="sortBy('network_switch')" />
        <base-table-header v-if="columns.download" :class="shortByKey === 'download' && 'active'" text="Download" @click="sortBy('download')" />
        <base-table-header v-if="columns.upload" :class="shortByKey === 'upload' && 'active'" text="Upload" @click="sortBy('upload')" />
        <base-table-header v-if="columns.temperature" :class="shortByKey === 'temperature' && 'active'" text="Temperature" @click="sortBy('temperature')" />
        <base-table-header v-if="columns.external_ip" :class="shortByKey === 'external_ip' && 'active'" text="External IP" @click="sortBy('external_ip')" />
        <base-table-header v-if="columns.process_count" :class="shortByKey === 'process_count' && 'active'" text="Process Count" @click="sortBy('process_count')" />
        <base-table-header v-if="columns.owner" :class="shortByKey === 'owner' && 'active'" text="Owner" @click="sortBy('owner')" />
        <base-table-header v-if="columns.action" :class="shortByKey === 'action' && 'active'" text="Action" @click="sortBy('action')" />
      </template>
      <template #rows>
        <tr
          v-for="machine of machines"
          :key="machine.hardware_uuid"
          @mouseenter="SoundManager.playHover()"
        >
          <th v-if="columns.hostname">
            <machine-stat :value="machine.name">
              <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.static_data?.os_name?.replace(/'/g, '')" />
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
          <th v-if="columns.cpu_usage">
            <machine-stat :value="machine.cpu_average.toFixed(2)" suffix="%">
              <i-fluency-processor />
            </machine-stat>
          </th>
          <th v-if="columns.cpu_speed">
            <machine-stat :value="machine.cpu_average_speed.toFixed(2)" suffix="MHz">
              <i-fluency-speedometer />
            </machine-stat>
          </th>
          <th v-if="columns.ram_usage">
            <machine-stat :value="`${machine.ram_used.toFixed(2)} / ${machine.ram_total.toFixed(2)}`" suffix="GB">
              <i-fluency-memory />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_usage">
            <machine-stat :value="machine.dynamic_data?.gpu?.gpu_usage" suffix="%">
              <i-fluency-video-card />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_power_usage">
            <machine-stat :value="machine.dynamic_data?.gpu?.power_usage" suffix="mW">
              <i-fluency-lightning-bolt />
            </machine-stat>
          </th>
          <th v-if="columns.network_switch">
            <network-switch v-if="machine.dynamic_data?.network" :interfaces="machine.dynamic_data?.network" />
          </th>
          <th v-if="columns.download">
            <machine-stat :value="machine.total_download.toFixed(2)" suffix="Mbps">
              <i-fluency-down />
            </machine-stat>
          </th>
          <th v-if="columns.upload">
            <machine-stat :value="machine.total_upload.toFixed(2)" suffix="Mbps">
              <i-fluency-up />
            </machine-stat>
          </th>
          <th v-if="columns.temperature">
            <machine-stat :value="machine.dynamic_data?.temps?.[0].value.toFixed(2)" suffix="°C">
              <i-fluency-temperature />
            </machine-stat>
          </th>
          <th v-if="columns.external_ip">
            <machine-stat :value="machine.static_data.public_ip">
              <i-fluency-ipv6 />
            </machine-stat>
          </th>
          <th v-if="columns.process_count">
            <machine-stat :value="machine.dynamic_data?.processes">
              <i-fluency-processes />
            </machine-stat>
          </th>
          <th v-if="columns.owner">
            <div class="flex items-center gap-3">
              <avatar :user="machine.owner" class="w-16px" />
              {{ machine.owner.username }}
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
const shortByKey = ref("hostname");
const sortBy = (field: string) => {
	shortByKey.value = field;
};

const machines = computed(() => state.machines.getAll()
// Compute a bunch of properties so we don't have to do it multiple times
	.map(machine => ({
		...machine,
		temperature: machine.dynamic_data?.temps?.[0].value,
		is_online: machine.status === 2,
		owner: state.users.get(machine.owner_uuid),
	}))
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
		// Someone fix the || "" bullshit at some point thanks, it's there because you can't compare undefined
		// meaning the sorting breaks when you have offline machines visible
		switch (shortByKey.value) {
			case "hostname":
				return a.static_data.hostname!.toLowerCase() > b.static_data.hostname!.toLowerCase() ? -1 : 1;
			case "cpu_usage":
				return (a.cpu_average || "") < (b.cpu_average || "") ? -1 : 1;
			case "cpu_speed":
				return (a.cpu_average_speed || "") < (b.cpu_average_speed || "") ? -1 : 1;
			case "ram_usage":
				return (a.ram_used / a.ram_total || "") < (b.ram_used / b.ram_total || "") ? -1 : 1;
			case "network_switch":
				return (a.dynamic_data?.network.length || "") < (b.dynamic_data?.network.length || "") ? -1 : 1;
			case "download":
				return (a.total_download || "") < (b.total_download || "") ? -1 : 1;
			case "upload":
				return (a.total_upload || "") < (b.total_upload || "") ? -1 : 1;
			case "temperature":
				return (a.temperature || "") < (b.temperature || "") ? -1 : 1;
			case "gpu_usage":
				return (a.dynamic_data?.gpu?.gpu_usage || "") < (b.dynamic_data?.gpu?.gpu_usage || "") ? -1 : 1;
			case "gpu_power_usage":
				return (a.dynamic_data?.gpu?.power_usage || "") < (b.dynamic_data?.gpu?.power_usage || "") ? -1 : 1;
			case "external_ip":
				return (a.static_data.public_ip || "") < (b.static_data.public_ip || "") ? -1 : 1;
			case "process_count":
				return (a.dynamic_data?.processes || "") < (b.dynamic_data?.processes || "") ? -1 : 1;
			case "owner":
				return a.owner.username.toLowerCase() > b.owner.username.toLowerCase() ? -1 : 1;
			default:
				return a.static_data.hostname!.toLowerCase() > b.static_data.hostname!.toLowerCase() ? -1 : 1;
		}
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
