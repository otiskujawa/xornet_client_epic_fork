<template>
  <div class="flex text-center items-center  gap-4 justify-center h-full w-full">
    <i-fluency-loading class="text-4xl animate-spin animate-duration-1s" />
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{text: string}>();
</script>
