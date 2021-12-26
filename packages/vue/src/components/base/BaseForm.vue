<template>
  <form class="text-text flex flex-col gap-4 p-6" @submit.prevent="$emit('submit')">
    <h1 class="font-bold text-lg">
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

<style scoped lang="postcss">

</style>
