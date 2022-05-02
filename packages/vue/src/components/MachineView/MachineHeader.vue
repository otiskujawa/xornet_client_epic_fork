<template>
  <div v-if="machine" class="pr-4 py-1 flex justify-between">
    <div class="flex gap-2 items-center">
      <router-link class="flex no-drag items-center p-4 pr-2 opacity-50 hover:opacity-100" :to="{name: 'machines'}">
        <i-fluency-back />
      </router-link>
      <distro-icon class="text-2xl" :name="machine.os_name" />
      <p class="opacity-50" />
      <router-link class="no-drag flexcol gap-1 text-text text-opacity-50 hover:text-opacity-100" :to="{name: 'machine', params: {uuid: machine.uuid}}">
        <div class="flex items-center gap-2">
          <machine-state :status="machine.status" />
          {{ machine.name }}
          ({{ machine.os_name }})
        </div>
        <p class="text-xs text-text text-opacity-25">
          {{ machine.uuid }}
        </p>
      </router-link>
      <base-confirmation-dialog v-if="machine.owner_uuid === state.users.getMe().uuid" confirmation-text="Are you sure you want to delete this machine?" @confirm="state.machines.deleteMachine(machine.uuid)">
        <base-button text="Delete">
          <i-fluency-trash />
        </base-button>
      </base-confirmation-dialog>
    </div>
    <mini-profile v-if="state.users.get(machine.owner_uuid)" :user="state.users.get(machine.owner_uuid)">
      <machine-user :user="state.users.get(machine.owner_uuid)" />
    </mini-profile>
  </div>
</template>

<script setup lang="ts">
import ActivityStatus from "../ActivityStatus.vue";
import { useState } from "/@/app";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
import type { IMachine } from "/@/types/api/machine";
import BaseButton from "../base/BaseButton.vue";
import BaseConfirmationDialog from "../base/BaseConfirmationDialog.vue";
import MachineState from "../MachineState.vue";
import MiniProfile from "../MiniProfile.vue";
import MachineUser from "./MachineUser.vue";
defineProps<{machine: IMachine}>();
const state = useState();
</script>
