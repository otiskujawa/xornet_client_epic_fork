<template>
  <img class="w-5.5 h-4 rounded-2px" :src="`https://cdn.ipwhois.io/flags/${countryCode.toLowerCase()}.svg`" :alt="countryCode">
</template>

<script setup lang="ts">
defineProps<{countryCode: string}>();
</script>
