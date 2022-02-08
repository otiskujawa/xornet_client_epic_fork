<template>
  <div v-if="user" class="rounded-full">
    <router-link v-if="user.uuid" draggable="false" :to="{ name: 'profile', params: { uuid: user.uuid }}">
      <img class="rounded-full object-cover" :src="user.avatar || defaultAvatar" :alt="user.username" style="aspect-ratio: 1/1">
    </router-link>
    <img v-else class="object-cover" :src="user.avatar || defaultAvatar" :alt="user.username" style="aspect-ratio: 1/1">
  </div>
</template>
<script setup lang="ts">
import type { IUser } from "/@/types/api/user";
const defaultAvatar = "https://cdn.discordapp.com/attachments/755597803102928966/933895255508525177/unknown.png";
defineProps<{
	user?: IUser
}>();
</script>
