<template>
  <div class="w-full h-full  bg-background-400">
    <div class="p-2 pr-1 flex gap-4 max-w-64">
      <base-input v-model="filter" placeholder="Filter" />

      <base-tooltip text="Add machine">
        <base-button transparent class="w-12 flex items-center justify-center" @click="showTokenGenerator = true">
          <i-fluency-plus class="w-4 h-4" />
        </base-button>
      </base-tooltip>

      <base-dialog v-model="showTokenGenerator" unsized>
        <token-generator />
      </base-dialog>
    </div>
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

import BaseInput from "./base/BaseInput.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseDialog from "./base/BaseDialog.vue";
import TokenGenerator from "./TokenGenerator.vue";

const state = useState();

state.machines.fetchMachines();

const filter = ref("");
const mode: Ref<"minimal" | "normal" | "maximal"> = ref("normal");
const showTokenGenerator = ref(false);

</script>
