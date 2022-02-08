<template>
  <form class="text-text flexcol gap-2 p-3 no-drag" @submit.prevent="$emit('submit')">
    <h1 class="font-bold ">
      {{ title }}
    </h1>
    <slot />
  </form>
</template>

<script setup lang="ts">
defineProps<{
	title: string
}>();
defineEmits(["submit"]);
</script>
