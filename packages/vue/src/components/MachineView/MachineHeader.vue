<template>
  <div v-if="machine" class="flexcol">
    <div class="px-2 pt-1 drag flex items-center">
      <router-link class="flex no-drag items-center p-4 opacity-50 hover:opacity-100" :to="{name: 'machines'}">
        <i-fluency-back />
      </router-link>
      <p class="opacity-50" />
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
        <network-switch :interfaces="machine.network?.filter(iface => !isDockerInterface(iface))" />
        <network-switch docker :interfaces="machine.network?.filter(iface => isDockerInterface(iface))" />
        <base-confirmation-dialog v-if="machine.owner_uuid === state.users.getMe().uuid" confirmation-text="Are you sure you want to delete this machine?" @confirm="state.machines.deleteMachine(machine.uuid)">
          <i-fluency-trash class="text-4xl cursor-pointer hover:text-primary-500" />
        </base-confirmation-dialog>
      </div>
      <machine-user :user="state.users.get(machine.owner_uuid)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityStatus from "../ActivityStatus.vue";
import NetworkSwitch from "../NetworkSwitch.vue";
import MachineUser from "./MachineUser.vue";
import { useState } from "/@/app";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import { isDockerInterface } from "/@/services/logic";
import type { IMachine } from "/@/types/api/machine";
defineProps<{machine: IMachine}>();
const state = useState();
</script>
