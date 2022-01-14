<template>
  <div>
    <div v-if="value" class="flex gap-2 items-center">
      <slot />
      <p>{{ value }} {{ suffix }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{value?: string | number; suffix?: string}>();
</script>
