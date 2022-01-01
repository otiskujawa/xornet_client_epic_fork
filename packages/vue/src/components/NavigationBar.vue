<template>
  <nav class="h-full justify-between w-min flex flex-col">
    <ul>
      <navigation-button name="machines" icon="nas" :to="{ name: 'machines' }" />
      <navigation-button name="settings" icon="settings" :to="{ name: 'settings' }" />
      <navigation-button name="profile" icon="user" :to="{ name: 'profile', params: { uuid: state.users.getMe()?.uuid } }" />
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
      <li class="flex">
        <div
          class="p-4 flex items-center justify-center "
        >
          <img class="w-6 h-6 rounded-full" draggable="false" :src="state.users.getMe()?.avatar" alt="">
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useState } from "../services/state";
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

a {
  &:hover {
    @apply opacity-50;
  }
  &.router-link-active {
    @apply opacity-100;
  }
}
</style>
