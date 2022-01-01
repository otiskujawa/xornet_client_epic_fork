<template>
  <img class="rounded-full" :src="img" alt="avatar" :style="{width: (width || 'auto'), height: (height || 'auto')}">
</template>
<script setup lang="ts">
const props = defineProps<{
	img?: string
	width?: string
	height?: string
}>();
</script>
