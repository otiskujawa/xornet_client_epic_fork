<template>
  <div class="flexcol">
    <div class="px-2 pt-1 drag flex items-center">
      <router-link class="flex no-drag items-center p-4 opacity-50 hover:opacity-100" :to="{name: 'machines'}">
        <i-fluency-home />
      </router-link>
      <p class="opacity-50">
        /
      </p>
      <router-link class="p-4 no-drag opacity-50 hover:opacity-100" :to="{name: 'machine', params: {uuid: machine.uuid}}">
        {{ machine.name }}
      </router-link>
    </div>
    <div class="text-lg p-4 pt-3 flex gap-4 items-center">
      <distro-icon class="text-4xl" :name="machine.os_name" />
      <div class="flexcol">
        <div class="flex gap-1 items-center">
          <activity-status :machine="machine" />
          <h1>
            {{ machine.name }}
          </h1>
        </div>
        <p class="opacity-35">
          {{ machine.uuid }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import type { IMachine } from "/@/types/api/machine";
import ActivityStatus from "../ActivityStatus.vue";
defineProps<{machine: IMachine}>();
</script>
