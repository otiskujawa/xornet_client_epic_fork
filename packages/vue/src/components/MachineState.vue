<template>
  <div
    v-if="machine.status === MachineStatus.Synced "
    :class="state.settings.general.enable_bloom && 'bloom'" class="  text-active bg-active bg-opacity-15  border-active"
  >
    SYNCED
  </div>
  <div
    v-else-if="machine.status === MachineStatus.Desync"
    :class="state.settings.general.enable_bloom && 'bloom'" class="   text-green-400 bg-green-400 bg-opacity-15  border-green-400"
  >
    DESYNC
  </div>
  <div
    v-else-if="machine.status === MachineStatus.HeartbeatMissed"
    :class="state.settings.general.enable_bloom && 'bloom'" class=" text-red-500 bg-red-500 bg-opacity-15  border-red-500"
  >
    HEARTBEAT MISSED
  </div>
  <div
    v-else
    :class="state.settings.general.enable_bloom && 'bloom'" class=" text-gray-600 bg-gray-600 bg-opacity-15  border-gray-600"
  >
    OFFLINE
  </div>
</template>

<script setup lang="ts">
import { useState } from "../app";
import type { IMachine } from "/@/types/api/machine";
import { MachineStatus } from "/@/types/api/machine";
defineProps<{machine: IMachine}>();
const state = useState();

</script>

<style scoped lang="postcss">

div {
  @apply text-9px w-min rounded-2px border-1 whitespace-nowrap font-semibold p-0.5 px-1 flex items-center justify-center;
}
</style>
