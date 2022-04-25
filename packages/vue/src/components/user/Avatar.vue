<template>
  <div v-if="user && user.uuid" :style="style" class="rounded-full">
    <router-link draggable="false" :to="{ name: 'profile', params: { uuid: user.uuid }}">
      <img class="rounded-full object-cover object-center w-full h-full " :src="user.avatar || defaultAvatar" :alt="user.username">
    </router-link>
  </div>
  <div v-else :style="style" class="rounded-full overflow-hidden">
    <img class="object-cover object-center w-full h-full " :src="url?.replace(/\s/g, '') || defaultAvatar">
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { IUser } from "/@/types/api/user";
const defaultAvatar = "https://cdn.discordapp.com/attachments/755597803102928966/964634149853999174/icon.png";
const props = defineProps<{
	user?: IUser
	url?: string
	size?: number
}>();

const style = computed(() => props.size ? `width: ${props.size * 4}px; height: ${props.size * 4}px;` : "");

</script>
