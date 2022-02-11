<template>
  <div class="text-lg p-4 flex gap-4 items-center">
    <distro-icon class="text-4xl" :name="machine.os_name" />
    <div class="flexcol">
      <div class="flex gap-1 items-center">
        <activity-status :machine="machine" />
        <h1>
          {{ machine.name }}
        </h1>
      </div>
      <p class="opacity-40">
        {{ machine.uuid }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import type { IMachine } from "/@/types/api/machine";
import ActivityStatus from "../ActivityStatus.vue";
defineProps<{machine: IMachine}>();
</script>
