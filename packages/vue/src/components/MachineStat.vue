<template>
  <p v-if="value && !value.toString().includes('NaN') && !value.toString().includes('undefined')" class="flex gap-2 items-center">
    <slot />
    {{ value }} {{ suffix }}
  </p>
  <p v-else class="flex gap-2 items-center opacity-20">
    <slot />
    Unavailable
  </p>
</template>

<script setup lang="ts">
defineProps<{value?: string | number; suffix?: string}>();
</script>
