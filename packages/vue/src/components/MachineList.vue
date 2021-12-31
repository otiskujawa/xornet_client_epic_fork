<template>
  <div class="w-full h-full bg-black bg-opacity-25">
    <machine-button
      v-for="machine of state.machines.getAll()"
      :key="machine.hardware_uuid"
      :mode="mode"
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

const mode: Ref<"minimal" | "normal" | "maximal"> = ref("normal");

</script>
