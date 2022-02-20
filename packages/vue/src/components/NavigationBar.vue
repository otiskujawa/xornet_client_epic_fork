<template>
  <nav class="p-4 mb-1 items-center flex sm:hidden bg-black bg-opacity-25 w-full">
    <div class="flex w-full h-min justify-between bg-background-300 rounded-full px-10 pr-24 border-1 border-background-500 ">
      <navigation-button name="machines" :to="{ name: 'machines' }">
        <i-fluency-nas class="text-2xl" />
      </navigation-button>
      <navigation-button name="profile" :to="{ name: 'profile', params: { uuid: me?.uuid } }">
        <i-fluency-user class="text-2xl" />
      </navigation-button>
      <navigation-button name="Open Command Palette" :shortcut="isElectron() ? ['Control', 'Shift', 'P'] : ['Control', 'k']" :handle-fn="() => state.window.isShowingCommandPallete = true">
        <i-fluency-command-palette class="text-2xl" />
      </navigation-button>
      <navigation-button name="settings" :to="{ name: 'settings' }">
        <i-fluency-settings class="text-2xl" />
      </navigation-button>
    </div>
    <li class="flex fixed bottom-4 right-4 items-center justify-center ">
      <avatar :user="me" class="w-16" />
    </li>
  </nav>
  <nav class="h-full hidden sm:flex flex-col justify-between w-min ">
    <ul>
      <navigation-button name="machines" :shortcut="['Control', '1']" :to="{ name: 'machines' }">
        <i-fluency-nas class="w-full h-full" />
      </navigation-button>
      <navigation-button name="settings" :shortcut="['Control', '2']" :to="{ name: 'settings' }">
        <i-fluency-settings class="w-full h-full" />
      </navigation-button>
      <navigation-button name="profile" :shortcut="['Control', '3']" :to="{ name: 'profile', params: { uuid: me?.uuid } }">
        <i-fluency-user class="w-full h-full" />
      </navigation-button>

      <div class="px-2">
        <div class="h-1px bg-black bg-opacity-50 w-full" />
      </div>
      <navigation-button name="Open Command Palette" :shortcut="isElectron() ? ['Control', 'Shift', 'P'] : ['Control', 'k']" :handle-fn="() => state.window.isShowingCommandPallete = true">
        <i-fluency-command-palette class="w-full h-full" />
      </navigation-button>

      <div class="px-2">
        <div class="h-1px bg-black bg-opacity-50 w-full" />
      </div>
      <navigation-button name="Github Repository" href="https://github.com/xornet-cloud">
        <i-fluency-github class="w-full h-full" />
      </navigation-button>
      <!-- <navigation-button v-if="!isElectron()" name="API Status" href="https://xornet.statuspage.io/">
        <i-fluency-area-chart class="w-full h-full" />
      </navigation-button> -->
    </ul>
    <ul>
      <div v-if="state.window.isSyncing" class="p-4" name="Syncing settings...">
        <i-fluency-synchronize class="text-primary-300 w-full h-full animate-spin animate-reverse" />
      </div>
      <base-tooltip
        text="Logout"
        placement="right"
      >
        <li class="flex">
          <logout-button />
        </li>
      </base-tooltip>
      <li class="flex p-3 items-center justify-center ">
        <avatar :user="me" class="w-8" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import { useState } from "/@/app";
import Avatar from "/@/components/user/Avatar.vue";
import BaseTooltip from "/@/components/base/BaseTooltip.vue";
import LogoutButton from "/@/components/NavigationBar/LogoutButton.vue";
import NavigationButton from "/@/components/NavigationButton.vue";
import { computed } from "vue";
const state = useState();
const me = computed(() => state.users.getMe());

</script>

<style scoped lang="postcss">
nav {
  -webkit-app-region: drag;
}

ul {
  -webkit-app-region: no-drag;
}

</style>
