<template>
  <button :class="!transparent && 'bg-primary-500 active:bg-primary-400 '" class="active:shadow-xl  ring-white filter disabled:saturate-20 disabled:cursor-not-allowed hover flex items-center gap-2 px-4 transition duration-200 text-white rounded-2px  py-2 focus-within:ring-2 " @click="SoundManager.playClick()" @mouseenter="SoundManager.playHover()">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { SoundManager } from "/@/services/SoundManager";

defineProps<{
	transparent?: boolean
}>();
</script>
