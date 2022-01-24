<template>
  <div
    id="main"
    class="flex h-full flex-col overflow-hidden bg-background-300"
    :class="state.window.isMaximized || !isElectron() || !state.settings.enableRoundedCorners.value ? 'rounded-0px' : 'rounded-8px'"
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
  @apply !outline-none fill-current text-sm;
  scrollbar-width: thin;
  font-family: "Roboto Mono", monospace;
}

input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.fullscreen {
  @apply fixed top-0 left-0 z-0 w-full h-full;
}

*::-webkit-scrollbar {
  width: 6px;
  left: -100px;
}
*:hover::-webkit-scrollbar {
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
</style>
