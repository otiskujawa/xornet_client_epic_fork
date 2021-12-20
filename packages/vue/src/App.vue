<template>
  <div>
    <control-buttons v-if="isElectron()" />
    <navigation-bar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import NavigationBar from "/@/components/NavigationBar.vue";
import ControlButtons from "/@/components/electron/ControlButtons.vue";
</script>

<style lang="postcss">
:root {
  --background-color: #21212133;
}
* {
  @apply !outline-none fill-current;
  scrollbar-width: thin;
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
