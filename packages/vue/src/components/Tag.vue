<template>
  <div class="h-min w-min rounded-full border-1 border-current bg-opacity-10 px-2.5 py-0.5 ">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{text: string}>();
</script>
