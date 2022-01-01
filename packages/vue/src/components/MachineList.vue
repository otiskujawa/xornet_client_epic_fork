<template>
  <div class="w-full  h-full bg-black bg-opacity-25">
    <base-table
      :headers="[
        'Hostname',
        'CPU Usage',
        'RAM Usage',
        'Network Switch',
        'Download',
        'Upload',
        'Temperature',
        'Owner',
        'Status'
      ]"
    >
      <tr
        v-for="machine of state.machines.getAll().sort((a) => a.status == 2 ? -1 : 1)"
        :key="machine.hardware_uuid"
        @mouseenter="SoundManager.playHover()"
      >
        <th>
          <machine-stat :value="machine.name">
            <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.static_data?.os_name?.replace(/'/g, '')" />
          </machine-stat>
        </th>
        <th>
          <machine-stat :value="(machine.dynamic_data?.cpu.usage.reduce((a, b) => a + b, 0) / machine.dynamic_data?.cpu.usage.length).toFixed(2)" suffix="%">
            <i-fluency-processor />
          </machine-stat>
        </th>
        <th>
          <machine-stat :value="`${(machine.dynamic_data?.ram.used / 1024 / 1024).toFixed(2)} / ${(machine.dynamic_data?.ram.total / 1024 / 1024).toFixed(2)}`" suffix="GB">
            <i-fluency-memory />
          </machine-stat>
        </th>
        <th>
          <network-switch :interfaces="machine.dynamic_data?.network" />
        </th>
        <th>
          <machine-stat :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.rx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
            <i-fluency-down />
          </machine-stat>
        </th>
        <th>
          <machine-stat :value="(machine.dynamic_data?.network.reduce((a, b) => a + b.tx, 0) / 1000 / 1000).toFixed(2)" suffix="Mbps">
            <i-fluency-up />
          </machine-stat>
        </th>
        <th>
          <machine-stat :value="machine.dynamic_data?.temps?.[0].value.toFixed(2)" suffix="°C">
            <i-fluency-temperature />
          </machine-stat>
        </th>
        <th>
          <base-tooltip :text="state.users.get(machine.owner_uuid)?.username">
            <avatar :uuid="state.users.get(machine.owner_uuid)?.uuid" :img="state.users.get(machine.owner_uuid)?.avatar" width="16px" />
          </base-tooltip>
        </th>
        <th>
          <i-fluency-status
            class="w-16px h-16px min-w-16px min-h-16px"
            :class="machine.status == 2 ? 'text-active text-opacity-100' : 'text-white text-opacity-5'"
          />
        </th>
      </tr>
    </base-table>
  </div>
</template>

<script setup lang="ts">
import { SoundManager } from "../services/SoundManager";
import { useState } from "../services/state";
import BaseTable from "./base/BaseTable.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import MachineStat from "./MachineStat.vue";
import NetworkSwitch from "./NetworkSwitch.vue";
import Avatar from "./user/Avatar.vue";
const state = useState();
// Little hack troll
if (state.machines.getTotal() === 0) state.machines.fetchMachines();
</script>
