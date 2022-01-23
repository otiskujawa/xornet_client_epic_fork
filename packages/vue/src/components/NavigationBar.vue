<template>
  <nav class="h-full justify-between w-min flex flex-col">
    <ul>
      <navigation-button name="machines" :to="{ name: 'machines' }">
        <i-fluency-nas class="w-full h-full" />
      </navigation-button>
      <navigation-button name="settings" :to="{ name: 'settings' }">
        <i-fluency-settings class="w-full h-full" />
      </navigation-button>
      <navigation-button name="profile" :to="{ name: 'profile', params: { uuid: state.users.getMe()?.uuid } }">
        <i-fluency-user class="w-full h-full" />
      </navigation-button>
      <navigation-button name="Github Repository" href="https://github.com/xornet-cloud">
        <i-fluency-github class="w-full h-full" />
      </navigation-button>
    </ul>
    <ul>
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
import { useState } from "../services/state";
import Avatar from "./user/Avatar.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import LogoutButton from "/@/components/NavigationBar/LogoutButton.vue";
import NavigationButton from "./NavigationButton.vue";
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
