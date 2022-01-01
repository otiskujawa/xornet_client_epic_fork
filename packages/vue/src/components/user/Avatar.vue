<template>
  <router-link v-if="uuid" draggable="false" :to="{ name: 'profile', params: { uuid }}">
    <img class="rounded-full" :src="img" alt="avatar" :style="{width: (width || 'auto'), height: (height || 'auto')}">
  </router-link>
  <img v-else class="rounded-full" :src="img" alt="avatar" :style="{width: (width || 'auto'), height: (height || 'auto')}">
</template>
<script setup lang="ts">
const props = defineProps<{
	img?: string
	uuid?: string
	width?: string
	height?: string
}>();
</script>
