<template>
  <div v-if="user" class="text-right flex gap-4 py-4">
    <div class="flexcol">
      <p>{{ user.username }}</p>
      <p class="opacity-35">
        {{ user.uuid }}
      </p>
    </div>
    <avatar :user="user" class="w-10" />
  </div>
</template>

<script setup lang="ts">
import Avatar from "../user/Avatar.vue";
import type { IUser } from "/@/types/api/user";
defineProps<{user: IUser}>();
</script>
