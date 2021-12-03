<script setup lang="ts"></script>

<template>
  <router-view />
</template>

<style scoped lang="postcss">
#app,
body,
html {
  @apply text-theme-700 h-full w-full select-none bg-theme-100;
  font-family: "Roboto";
}
svg {
  fill: currentColor;
}
* {
  @apply !outline-none;
}
*::selection {
  background-color: var(--accent-color);
}
*::-webkit-scrollbar {
  width: 6px;
  display: none;
  left: -100px;
}
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-corner {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  @apply bg-theme-400;
  border-radius: 20px;
  border: transparent;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="range"]::-webkit-slider-runnable-track {
  @apply bg-theme-300 rounded-full h-2;
}
input[type="range"]::-webkit-slider-thumb {
  @apply -mt-1;
}
.scrollable {
  overflow-y: overlay;
  overflow-x: initial;
}
.animated {
  @apply duration-50 transition-all;
}
.clicky {
  @apply cursor-pointer;
}
.fullscreen {
  @apply absolute top-0 left-0 w-full h-full;
}
</style>
