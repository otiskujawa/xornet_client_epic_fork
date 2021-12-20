<template>
  <div>
    <navigation-bar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./components/shared/NavigationBar.vue";
</script>

<style lang="postcss">
:root {
  --background-color: #212121;
}

* {
  scrollbar-width: thin;
  fill: currentColor;
}
*::selection {
  background-color: var(--accent-color);
}
*::-webkit-scrollbar {
  width: 6px;
  display: none;
  left: -100px;
}
*:hover::-webkit-scrollbar {
  display: initial;
  overflow-y: overlay;
}
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-corner {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: transparent;
}

body,
html,
#app {
  @apply h-full w-full bg-background-color text-white;
}
</style>
