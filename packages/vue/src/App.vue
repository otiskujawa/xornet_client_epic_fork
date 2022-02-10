<template>
  <div
    id="main"
    class="h-full flexcol overflow-hidden bg-background-300"
    :class="state.window.isMaximized || !isElectron() || !state.settings.general.enable_rounded_corners ? 'rounded-0px' : 'rounded-8px'"
  >
    <control-buttons v-if="isElectron()" />
    <command-pallete />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import ControlButtons from "/@/components/electron/ControlButtons.vue";
import { isElectron } from "/@/services/logic";
import CommandPallete from "/@/components/CommandPallete.vue";
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

.center {
  @apply top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.flexcol {
  @apply flex flex-col;
}
</style>
