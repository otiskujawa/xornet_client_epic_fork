<template>
  <div v-if="machine" class="flexcol bg-background-200 w-full">
    <machine-header :machine="machine" />
    <div class="flexcol gap-2 px-4">
      <machine-processor :machine="machine" />
      <machine-disk v-for="disk of machine.disks" :key="disk.mount" :disk="disk" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useState } from "/@/app";
import MachineHeader from "/@/components/MachineView/MachineHeader.vue";
import MachineDisk from "/@/components/MachineView/MachineDisk.vue";
import MachineProcessor from "/@/components/MachineView/MachineProcessor.vue";
const route = useRoute();
const state = useState();
const machineUuid = computed(() => route.params.uuid as string);
const machine = computed(() => state.machines.get(machineUuid.value));
</script>
