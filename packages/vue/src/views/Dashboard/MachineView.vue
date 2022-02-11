<template>
  <div v-if="machine" class="flexcol  gap-4 bg-background-200 w-full">
    <machine-header :machine="machine" />
    <div class="p-4">
      <network-switch v-if="machine.network" :interfaces="machine.network" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useState } from "/@/app";
import MachineHeader from "/@/components/MachineView/MachineHeader.vue";
import NetworkSwitch from "/@/components/NetworkSwitch.vue";
const route = useRoute();
const state = useState();
const machineUuid = computed(() => route.params.uuid as string);
const machine = computed(() => state.machines.get(machineUuid.value));
</script>
