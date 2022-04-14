<template>
  <div class="bg-black bg-opacity-25 w-full  overflow-scroll p-4">
    <table class="w-full border-1 rounded-4px border-background-400">
      <tr>
        <th>Av</th>
        <th>Username</th>
        <th>Role</th>
        <th>UUID</th>
        <th>Email</th>
        <th>IPs</th>
        <th>Created</th>
        <th>Last Login</th>
        <th>Actions</th>
      </tr>
      <tr v-for="user of users" :key="user.uuid" class="border-1 border-transparent border-background-400 p-2 text-text hover:text-opacity-100 text-opacity-50">
        <td><avatar :size="6" :user="user" /></td>
        <td>{{ user.username }}</td>
        <td><admin-tag :user="user" /></td>
        <td>{{ user.uuid }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.ips }}</td>
        <td>{{ new Date(user.created_at).toLocaleString() }}</td>
        <td>{{ secondsToHuman(secondsSince(user.updated_at)) }} ago</td>
        <td class="flex gap-2">
          <!-- <base-button @click="banUser(user)">
            Ban
          </base-button> -->
          <base-confirmation-dialog :confirmation-text="`Delete ${user.username}'s account?`" @confirm="deleteUser(user)">
            <base-button>
              Delete
            </base-button>
          </base-confirmation-dialog>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import { computed, onMounted, ref } from "vue";
import Avatar from "/@/components/user/Avatar.vue";
import AdminTag from "/@/components/tags/AdminTag.vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import type { IUser } from "/@/types/api/user";
import { secondsSince, secondsToHuman } from "../../services/logic";
import { useKeyModifier } from "@vueuse/core";
import BaseDialog from "/@/components/base/BaseDialog.vue";
import BaseConfirmationDialog from "/@/components/base/BaseConfirmationDialog.vue";

const isShowingDeletePrompt = ref(false);
const state = useState();
const users = computed(() => state.users.getAll());
const shift = useKeyModifier("Shift");

onMounted(() => state.users.fetchAll());

// const banUser = (user: IUser) => {
// 	state.users.banUser();
// };

const deleteUser = (user: IUser) => {
	state.users.deleteUser(user);
};

</script>

<style scoped lang="postcss">
table td {
  @apply px-3 py-2;
}
</style>
