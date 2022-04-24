<template>
  <div class="flex gap-4 w-full items-center max-w-256 px-1/40  ">
    <avatar :size="16" :user="user" />
    <div class="flexcol gap-2">
      <div class="flex items-center gap-4">
        <p class="text-2xl">
          {{ user?.username }}
        </p>
        <admin-tag :user="user" />
      </div>
      <p class="text-text text-opacity-50 font-light">
        {{ user?.uuid }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "../types/api/user";

defineProps<{user: IUser}>();
</script>
