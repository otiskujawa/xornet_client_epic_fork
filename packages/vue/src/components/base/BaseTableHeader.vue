<template>
  <th class="header cursor-pointer hover:text-opacity-100">
    {{ text }}
  </th>
</template>

<script setup lang="ts">
defineProps<{text: string}>();

</script>

<style scoped lang="postcss">

</style>
