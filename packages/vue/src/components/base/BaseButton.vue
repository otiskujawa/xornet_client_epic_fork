<template>
  <button
    :class="!borderless && 'border-1 border-opacity-50  hover:border-opacity-75 border-primary-400 '"
    class="
      active:shadow-xl
      active:scale-90 transform no-drag
      hover:bg-primary-400
      hover:bg-opacity-25 text-primary-300
      ring-white filter
      disabled:saturate-20
      disabled:cursor-not-allowed
      cursor-pointer flex items-center
      gap-2 transition duration-100
      rounded-4px px-4 py-2
    "
    @click="soundManager.playClick();"
    @mouseenter="soundManager.playHover()"
  >
    <slot />
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { useSoundManager } from "/@/app";
const soundManager = useSoundManager();
defineProps<{
	borderless?: boolean
	text?: string
}>();
</script>
