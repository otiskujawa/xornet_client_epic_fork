<template>
  <button :class="!transparent && 'focus-within:ring-2 bg-primary-500 active:bg-primary-400 '" class="active:shadow-xl  ring-white filter disabled:saturate-20 disabled:cursor-not-allowed hover flex items-center gap-2 px-4 transition duration-200 text-white rounded-2px text-sm py-2">
    <slot />
  </button>
</template>

<script lang="ts" setup>

defineProps<{
  transparent: boolean;
}>();
</script>