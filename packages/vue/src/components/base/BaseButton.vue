<template>
  <button
    :class="[red ? 'bg-caution active:bg-white active:text-caution' : transparent ? '' : 'bg-primary-500 active:bg-primary-400']"
    class="active:shadow-xl no-drag ring-white filter disabled:saturate-20 disabled:cursor-not-allowed hover cursor-pointer flex items-center gap-2 transition duration-200  rounded-2px px-4 py-2 focus-within:ring-2 "
    @click="soundManager.playClick()"
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
	transparent?: boolean
	text?: string
	red?: boolean
}>();
</script>
