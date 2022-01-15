<template>
  <div class="w-full h-full overflow-scroll">
    <base-table>
      <template #headers>
        <base-table-header v-if="columns.hostname" text="Hostname" />
        <base-table-header v-if="columns.cpu_usage" text="CPU Usage" />
        <base-table-header v-if="columns.ram_usage" text="RAM Usage" />
        <base-table-header v-if="columns.gpu_usage" text="GPU Usage" />
        <base-table-header v-if="columns.gpu_power_usage" text="GPU Power Usage" />
        <base-table-header v-if="columns.network_switch" text="Network Switch" />
        <base-table-header v-if="columns.download" text="Download" />
        <base-table-header v-if="columns.upload" text="Upload" />
        <base-table-header v-if="columns.temperature" text="Temperature" />
        <base-table-header v-if="columns.owner" text="Owner" />
        <base-table-header v-if="columns.status" text="Status" />
        <base-table-header v-if="columns.action" text="Action" />
      </template>
      <template #rows>
        <tr
          v-for="machine of state.machines.getAll().sort((a) => a.status == 2 ? -1 : 1)"
          :key="machine.hardware_uuid"
          @mouseenter="SoundManager.playHover()"
        >
          <th v-if="columns.hostname">
            <machine-stat :value="machine.name">
              <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.static_data?.os_name?.replace(/'/g, '')" />
            </machine-stat>
          </th>
          <th v-if="columns.cpu_usage">
            <machine-stat v-if="machine.status == 2" :value="(machine.dynamic_data?.cpu.usage.reduce((a, b) => a + b, 0) / machine.dynamic_data?.cpu.usage.length).toFixed(2)" suffix="%">
              <i-fluency-processor />
            </machine-stat>
          </th>
          <th v-if="columns.ram_usage">
            <machine-stat v-if="machine.status == 2" :value="`${(machine.dynamic_data?.ram.used / 1024 / 1024).toFixed(2)} / ${(machine.dynamic_data?.ram.total / 1024 / 1024).toFixed(2)}`" suffix="GB">
              <i-fluency-memory />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_usage">
            <machine-stat v-if="machine.status == 2" :value="machine.dynamic_data?.gpu?.gpu_usage" suffix="%">
              <i-fluency-video-card />
            </machine-stat>
          </th>
          <th v-if="columns.gpu_power_usage">
            <machine-stat v-if="machine.status == 2" :value="machine.dynamic_data?.gpu?.power_usage" suffix="mW">
              <i-fluency-lightning-bolt />
            </machine-stat>
          </th>
          <th v-if="columns.network_switch">
            <network-switch :interfaces="machine.dynamic_data?.network" />
          </th>
          <th v-if="columns.download">
            <machine-stat v-if="machine.status == 2" :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.rx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
              <i-fluency-down />
            </machine-stat>
          </th>
          <th v-if="columns.upload">
            <machine-stat v-if="machine.status == 2" :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.tx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
              <i-fluency-up />
            </machine-stat>
          </th>
          <th v-if="columns.temperature">
            <machine-stat :value="machine.dynamic_data?.temps?.[0].value.toFixed(2)" suffix="°C">
              <i-fluency-temperature />
            </machine-stat>
          </th>
          <th v-if="columns.owner">
            <base-tooltip :text="state.users.get(machine.owner_uuid)?.username">
              <avatar :user="state.users.get(machine.owner_uuid)" width="16px" />
            </base-tooltip>
          </th>
          <th v-if="machine.status == 2 && columns.status" class="flex items-center h-min gap-2 justify-start">
            <i-fluency-status
              class="w-16px h-16px min-w-16px min-h-16px text-active text-opacity-100"
            />
            Online
          </th>
          <th v-else-if="machine.status !== 2 && columns.status" class="flex items-center h-min gap-2 justify-start">
            <i-fluency-status
              class="w-16px h-16px min-w-16px min-h-16px text-active text-opacity-100 text-white text-opacity-5"
            />
            Offline
          </th>
          <th v-if="columns.action">
            <base-confirmation-dialog confirmation-text="Are you sure you want to delete this machine?" @confirm="deleteMachine(machine.uuid)">
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
import { computed } from "vue";
import { SoundManager } from "../services/SoundManager";
import { useState } from "../services/state";
import BaseTable from "./base/BaseTable.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import MachineStat from "./MachineStat.vue";
import NetworkSwitch from "./NetworkSwitch.vue";
import Avatar from "./user/Avatar.vue";
import BaseConfirmationDialog from "./base/BaseConfirmationDialog.vue";
import BaseTableHeader from "./base/BaseTableHeader.vue";
const state = useState();
const columns = computed(() => state.settings.columns);
// Little hack troll
if (state.machines.getTotal() === 0) state.machines.fetchMachines();

const deleteMachine = async(uuid: uuid) => {
	const { machines } = useState();
	await machines.deleteMachine(uuid);
};
</script>
