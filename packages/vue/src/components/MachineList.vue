<template>
  <div class="w-full h-full bg-black bg-opacity-25">
    <machine-button
      v-for="machine of state.machines.getAll().filter(machine => machine.status == 2)"
      :key="machine.hardware_uuid"
      :machine="machine"
    />
    <div class="h-1px w-full bg-white my-2 bg-opacity-5" />
    <machine-button
      v-for="machine of state.machines.getAll().filter(machine => machine.status != 2)"
      :key="machine.hardware_uuid"
      :machine="machine"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

import { useState } from "../services/state";

import MachineButton from "/@/components/MachineButton.vue";

const state = useState();

state.machines.fetchMachines();
</script>
