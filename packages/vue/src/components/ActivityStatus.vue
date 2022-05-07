<template>
  <div
    v-if="status === MachineStatus.Online"
    :class="state.settings.general.enable_bloom && 'bloom'"
    class="bg-active text-active"
  />
  <div
    v-else-if="status === MachineStatus.Desync"
    :class="state.settings.general.enable_bloom && 'bloom'"
    class="text-green-400 bg-green-400"
  />
  <div
    v-else-if="status === MachineStatus.Updating"
    :class="state.settings.general.enable_bloom && 'bloom'"
    class="text-cyan-500 bg-cyan-500"
  />
  <div
    v-else-if="status === MachineStatus.HeartbeatMissed"
    :class="state.settings.general.enable_bloom && 'bloom'"
    class="text-red-500 bg-red-500"
  />
  <div
    v-else
    class="bg-white text-white opacity-50"
  />
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import type { IMachine } from "/@/types/api/machine";
import { MachineStatus } from "/@/types/api/machine";
const state = useState();
defineProps<{status: IMachine["status"]}>();

</script>

<style scoped lang="postcss">
.bloom {
  box-shadow: 0px 0px 6px currentColor;
}
div {
  @apply mr-1 w-5px h-5px rounded-full;
}
</style>
