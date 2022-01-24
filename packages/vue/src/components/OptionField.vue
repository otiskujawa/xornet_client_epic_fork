<template>
  <div class="option">
    <label for="theme text-xl">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{label: string}>();
</script>

<style lang="postcss" scoped>
.option {
  @apply flex w-full gap-2 items-center justify-between max-w-168;
}
</style>
