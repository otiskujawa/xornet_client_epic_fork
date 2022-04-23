<template>
  <div
    v-if="machine.status === MachineStatus.Synced "
    class="state text-active bg-active bg-opacity-15"
  >
    SYNCED
  </div>
  <div
    v-else-if="machine.status === MachineStatus.Desync"
    class="state text-green-400 bg-green-400 bg-opacity-15"
  >
    DESYNC
  </div>
  <div
    v-else-if="machine.status === MachineStatus.Updating"
    class="state text-cyan-500 bg-cyan-500 bg-opacity-15"
  >
    <base-loading-spinner class="mr-1 w-11px h-11px" />
    UPDATING
  </div>
  <div
    v-else-if="machine.status === MachineStatus.HeartbeatMissed"
    class="state text-red-500 bg-red-500 bg-opacity-15"
  >
    HEARTBEAT MISSED
  </div>
  <div
    v-else
    class="state text-gray-600 bg-gray-600 bg-opacity-15"
  >
    OFFLINE
  </div>
</template>

<script setup lang="ts">
import { useState } from "../app";
import type { IMachine } from "/@/types/api/machine";
import { MachineStatus } from "/@/types/api/machine";
import BaseLoadingSpinner from "./base/BaseLoadingSpinner.vue";
defineProps<{machine: IMachine}>();
const state = useState();
</script>

<style scoped lang="postcss">
.state  {
  @apply text-9px w-min rounded-2px  whitespace-nowrap font-semibold p-1 px-1 flex items-center justify-center;
}
</style>
