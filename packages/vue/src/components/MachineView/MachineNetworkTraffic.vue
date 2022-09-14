<template>
  <div class="metric">
    <i-fluency-down />
    {{ totalDownload.toFixed(2) }}Mbps
  </div>
  <div class="metric">
    <i-fluency-up />
    {{ totalUpload.toFixed(2) }}Mbps
  </div>
</template>

<script setup lang="ts">
defineProps<{
	totalDownload: number
	totalUpload: number
}>();
</script>

<style scoped lang="postcss">
.metric {
  @apply flex items-center gap-2;
}
</style>
