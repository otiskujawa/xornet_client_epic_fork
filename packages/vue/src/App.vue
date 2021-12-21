<template>
  <div class="flex h-full">
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
  --background-color: #21212144;
}
* {
  @apply !outline-none fill-current;
  scrollbar-width: thin;
  font-family: "Roboto Mono", monospace;
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
