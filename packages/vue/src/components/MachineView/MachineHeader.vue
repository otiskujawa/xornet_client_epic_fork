<template>
  <div class="flexcol">
    <div class="px-2 pt-1 drag flex items-center">
      <router-link class="flex no-drag items-center p-4 opacity-50 hover:opacity-100" :to="{name: 'machines'}">
        <i-fluency-back />
      </router-link>
      <p class="opacity-50">
        /
      </p>
      <router-link class="p-4 no-drag opacity-50 hover:opacity-100" :to="{name: 'machine', params: {uuid: machine.uuid}}">
        {{ machine.name }}
        ({{ machine.os_name }})
      </router-link>
    </div>
    <div class="text-lg px-4 pb-3 flex justify-between">
      <div class="flex gap-4 items-center">
        <distro-icon class="text-4xl" :name="machine.os_name" />
        <div class="flexcol">
          <div class="flex gap-1 items-center">
            <activity-status :machine="machine" />
            <h1>
              {{ machine.name }}
              ({{ machine.os_name }})
            </h1>
          </div>
          <p class="opacity-35">
            {{ machine.uuid }}
          </p>
        </div>
        <network-switch :interfaces="machine.network!" />
      </div>
      <machine-user :user="state.users.get(machine.owner_uuid)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityStatus from "../ActivityStatus.vue";
import MachineUser from "./MachineUser.vue";
import { useState } from "/@/app";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import type { IMachine } from "/@/types/api/machine";
defineProps<{machine: IMachine}>();
const state = useState();
</script>
