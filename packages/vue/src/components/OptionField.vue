<template>
  <div class="option">
    <label for="theme text-xl">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{label: string}>();
</script>
