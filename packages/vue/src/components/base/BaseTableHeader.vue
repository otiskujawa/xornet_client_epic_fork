<template>
  <th class="header cursor-pointer hover:text-opacity-100">
    {{ text }}
    <i-fluency-up class="hidden" />
  </th>
</template>

<script setup lang="ts">
defineProps<{text: string}>();

</script>

<style scoped lang="postcss">

th.active {
  @apply text-opacity-100;
  & svg {
    @apply inline;
  }
}

</style>
