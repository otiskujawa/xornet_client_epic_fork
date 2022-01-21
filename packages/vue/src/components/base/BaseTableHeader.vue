<template>
  <th class="header capitalize cursor-pointer hover:text-opacity-100">
    {{ text.replaceAll('_', ' ')
      .replaceAll('ip', 'IP')
      .replaceAll('cpu', 'CPU')
      .replaceAll('gpu', 'GPU')
      .replaceAll('ram', 'RAM') }}
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
