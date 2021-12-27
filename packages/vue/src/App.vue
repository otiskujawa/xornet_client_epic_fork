<template>
  <div
    class="flex h-full"
    :class="state.window.isMaximized || !isElectron() ? 'rounded-0px' : 'rounded-8px'"
  >
    <control-buttons v-if="isElectron()" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useState } from "./services/state";
import ControlButtons from "/@/components/electron/ControlButtons.vue";
import { isElectron } from "/@/services/logic";
const state = useState();
</script>

<style lang="postcss">
* {
  @apply !outline-none fill-current;
  scrollbar-width: thin;
  font-family: "Roboto Mono", monospace;
}

.fullscreen {
  @apply fixed top-0 left-0 z-0 w-full h-full;
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
  @apply h-full w-full bg-transparent filter text-text overflow-hidden;
}

#app {
  @apply bg-background;
}
</style>
