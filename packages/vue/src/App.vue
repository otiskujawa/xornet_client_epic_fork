<template>
  <div
    id="main"
    class="h-full flexcol overflow-hidden bg-background-300"
    :class="state.window.isMaximized || !isElectron() || !state.settings.general.enable_rounded_corners ? 'rounded-0px' : 'rounded-8px'"
  >
    <control-buttons v-if="isElectron()" />
    <command-pallete />
    <base-dialog v-model="newBackendPopup" unsized @closed="logout()">
      <div class="rounded-8px gap-8 p-16 flexcol bg-background-300">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl">
            Notice
          </h1>
          <img class="w-24" src="https://cdn.discordapp.com/attachments/755597803102928966/947574327136624690/Go_Logo_Blue.svg" alt="">
        </div>
        <p>We updated our backend to Go! <span class="opacity-25">(I've lost all my braincells)</span></p>
        <p>
          This took me 3 entire days of no sleep to do <br>
          hopefully the backend survives the influx of data
        </p>
      </div>
    </base-dialog>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import ControlButtons from "/@/components/electron/ControlButtons.vue";
import { isElectron } from "/@/services/logic";
import CommandPallete from "/@/components/CommandPallete.vue";
import { useLocalStorage } from "@vueuse/core";
import BaseDialog from "./components/base/BaseDialog.vue";
import { useRouter } from "vue-router";
const newBackendPopup = useLocalStorage("hasNotSeenNewBackendPopup", true);
const state = useState();
const router = useRouter();
const logout = () => {
	router.push({ name: "signup" });
	state.users.logout();
};
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
  width: 4px;
}
*:hover::-webkit-scrollbar {
  overflow-y: overlay;
}
*::-webkit-scrollbar-track,
*::-webkit-scrollbar-corner {
  border-radius: 20px;
  background: #0000003a;
}
*::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: rgba(var(--color-primary-500));
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
