<template>
  <div v-if="machine" class="flexcol bg-background-200 w-full">
    <machine-header :machine="machine" />
    <div class="flexcol gap-2 px-4">
      <div v-for="disk of machine.disks" :key="disk.mount" class="flex items-center gap-2">
        <i-fluency-hdd v-if="disk.type === 'HDD'" class="text-2xl" />
        <i-fluency-ssd v-else class="text-2xl" />
        <div class="flexcol justify-between min-w-48">
          <div class="flex justify-between items-center">
            <p>
              {{ disk.mount }}
            </p>
            <p>
              {{ ( disk.used / disk.total * 100).toFixed(2) }}% used
            </p>
          </div>
          <div class="opacity-20 flex justify-between items-center">
            <p>
              {{ `${(disk.used / 1024 / 1024 / 1024).toFixed(2)} GB` }}
            </p>
            <p> / </p>
            <p>
              {{ `${(disk.total / 1024 / 1024 / 1024).toFixed(2)} GB` }}
            </p>
          </div>
        </div>
      </div>
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
