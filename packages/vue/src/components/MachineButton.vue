<template>
  <li
    class="text-sm select-none text-text text-opacity-50 cursor-pointer list-none flex py-6px px-16px items-center"
  >
    <div class="flex gap-8 items-center ">
      <machine-stat class="w-min-40" :value="machine.name">
        <distro-icon class="w-16px h-16px min-w-16px min-h-16px" name="alpine" />
      </machine-stat>

      <machine-stat class="w-min-28" :value="cpuUsage" suffix="%">
        <i-fluency-processor />
      </machine-stat>

      <machine-stat class="w-min-48" :value="memUsage" suffix="GB">
        <i-fluency-memory />
      </machine-stat>

      <machine-stat class="w-min-30" :value="download" suffix="Mbps">
        <i-fluency-down />
      </machine-stat>

      <machine-stat class="w-min-30" :value="upload" suffix="Mbps">
        <i-fluency-up />
      </machine-stat>

      <network-switch v-if="machine.dynamic_data" class="w-min-16" :interfaces="machine.dynamic_data.network" />

      <base-tooltip :text="state.users.get(machine.owner_uuid)?.username">
        <img class="w-4 h-4 rounded-full" :src="state.users.get(machine.owner_uuid)?.avatar" alt="">
      </base-tooltip>
    </div>
    <i-fluency-status
      class="w-16px h-16px min-w-16px min-h-16px"
      :class="machine.status ? 'text-active' : 'text-gray-400'"
    />
  </li>
</template>

<script setup lang="ts">
import type { IMachine } from "types/api/machine";
import { computed } from "vue";
import { useState } from "../services/state";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import MachineStat from "./MachineStat.vue";
import NetworkSwitch from "./NetworkSwitch.vue";
import BaseTooltip from "./base/BaseTooltip.vue";

const state = useState();
const props = defineProps<{
	machine: IMachine
}>();

const cpuUsage = computed(() => (props.machine.dynamic_data?.cpu.usage.reduce((a, b) => a + b, 0) / props.machine.dynamic_data?.cpu.usage.length).toFixed(2));
const memUsage = computed(() => `${(props.machine.dynamic_data?.ram.used / 1024 / 1024).toFixed(2)} / ${(props.machine.dynamic_data?.ram.total / 1024 / 1024).toFixed(2)}`);
const download = computed(() => (props.machine.dynamic_data?.network.reduce((a, b) => a + b.rx, 0) / 1000 / 1000).toFixed(2));
const upload = computed(() => (props.machine.dynamic_data?.network.reduce((a, b) => a + b.tx, 0) / 1000 / 1000).toFixed(2));

</script>

<style scoped lang="postcss">
li {
  &:hover {
    @apply bg-background-400 text-opacity-100;
  }
}
</style>
