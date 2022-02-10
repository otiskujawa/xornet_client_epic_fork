<template>
  <nav class="h-full justify-between w-min flexcol">
    <ul>
      <navigation-button name="machines" :shortcut="['Control', '1']" :to="{ name: 'machines' }">
        <i-fluency-nas class="w-full h-full" />
      </navigation-button>
      <navigation-button name="settings" :shortcut="['Control', '2']" :to="{ name: 'settings' }">
        <i-fluency-settings class="w-full h-full" />
      </navigation-button>
      <navigation-button name="profile" :shortcut="['Control', '3']" :to="{ name: 'profile', params: { uuid: state.users.getMe()?.uuid } }">
        <i-fluency-user class="w-full h-full" />
      </navigation-button>

      <div class="px-2">
        <div class="h-1px bg-background-200 w-full" />
      </div>
      <navigation-button name="Open Command Palette" :shortcut="isElectron() ? ['Control', 'Shift', 'P'] : ['Control', 'k']" :handle-fn="() => state.window.isShowingCommandPallete = true">
        <i-fluency-command-palette class="w-full h-full" />
      </navigation-button>

      <div class="px-2">
        <div class="h-1px bg-background-200 w-full" />
      </div>
      <navigation-button name="Github Repository" href="https://github.com/xornet-cloud">
        <i-fluency-github class="w-full h-full" />
      </navigation-button>
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
      <li class="flex p-3 flex items-center justify-center ">
        <avatar :user="state.users.getMe()" class="w-8" />
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
const state = useState();

</script>

<style scoped lang="postcss">
nav {
  -webkit-app-region: drag;
}

ul {
  -webkit-app-region: no-drag;
}

</style>
