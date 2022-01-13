<template>
  <div v-if="user" class="rounded-full">
    <router-link v-if="user.uuid" draggable="false" :to="{ name: 'profile', params: { uuid: user.uuid }}">
      <img class="rounded-full" :src="user.avatar" :alt="user.username" :style="{width: (width || 'auto'), height: (height || 'auto')}">
    </router-link>
    <img v-else :src="user.avatar" :alt="user.username" :style="{width: (width || 'auto'), height: (height || 'auto')}">
  </div>
</template>
<script setup lang="ts">
import type { IUser } from "types/api/user";
defineProps<{
	user?: IUser
	width?: string
	height?: string
}>();
</script>
