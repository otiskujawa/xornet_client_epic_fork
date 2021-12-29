<template>
  <div class="flex gap-2 items-center">
    <slot />
    <p>{{ value }} {{ suffix }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{value: string | number | undefined; suffix?: string}>();
</script>
