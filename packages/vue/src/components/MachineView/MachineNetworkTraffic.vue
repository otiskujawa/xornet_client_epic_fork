<template>
  <div class="metric">
    <i-fluency-up />
    {{ totalDownload.toFixed(2) }}Mbps
  </div>
  <div class="metric">
    <i-fluency-down />
    {{ totalUpload.toFixed(2) }}Mbps
  </div>
</template>

<script setup lang="ts">
defineProps<{
	totalDownload: number
	totalUpload: number
}>();
</script>

<style scoped>
.metric {
  @apply flex items-center gap-2;
}
</style>
