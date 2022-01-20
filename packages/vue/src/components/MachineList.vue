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
                v-if="machine.status == 2"
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
            <machine-stat :value="(machine.dynamic_data?.cpu.usage.reduce((a, b) => a + b, 0) / machine.dynamic_data?.cpu.usage.length).toFixed(2)" suffix="%">
              <i-fluency-processor />
            </machine-stat>
          </th>
          <th v-if="columns.cpu_speed">
            <machine-stat :value="(machine.dynamic_data?.cpu.freq.reduce((a, b) => a + b, 0) / machine.dynamic_data?.cpu.usage.length).toFixed(2)" suffix="MHz">
              <i-fluency-speedometer />
            </machine-stat>
          </th>
          <th v-if="columns.ram_usage">
            <machine-stat :value="`${(machine.dynamic_data?.ram.used / 1024 / 1024).toFixed(2)} / ${(machine.dynamic_data?.ram.total / 1024 / 1024).toFixed(2)}`" suffix="GB">
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
            <machine-stat :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.rx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
              <i-fluency-down />
            </machine-stat>
          </th>
          <th v-if="columns.upload">
            <machine-stat :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.tx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
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
              <avatar :user="state.users.get(machine.owner_uuid)" class="w-16px" />
              {{ state.users.get(machine.owner_uuid)?.username }}
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
const machines = computed(() => state.machines.getAll()
	.filter(machine =>
		machine.name.toLowerCase().includes(state.machines.filterText.value)
    || state.users.get(machine.owner_uuid).username.toLowerCase().includes(state.machines.filterText.value),
	)
	.filter(machine => state.settings.showOfflineMachines.value ? machine : machine.status === 2)
	.filter(machine => state.settings.showOwnedMachinesOnly.value ? machine.owner_uuid === state.users.getMe().uuid : machine)
	.sort(a => a.status === 2 ? -1 : 1));
const sortBy = (field: string) => {
	shortByKey.value = field;
};

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
