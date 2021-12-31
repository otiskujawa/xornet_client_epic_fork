<template>
  <nav class="h-full justify-between w-min flex flex-col">
    <ul>
      <base-tooltip
        v-for="route of routes.filter(route => !!route.icon)"
        :key="route.path"
        :text="route.name as string"
        placement="right"
      >
        <li class="flex">
          <router-link draggable="false"
            class="p-4 flex items-center justify-center text-69px opacity-25"
            :to="route.name"
          >
            <icon class="w-24px h-24px" :name="route.icon!" />
          </router-link>
        </li>
      </base-tooltip>
    </ul>
    <ul>
      <base-tooltip
        text="Logout"
        placement="right"
      >
        <li class="flex">
          <router-link draggable="false"
            class="p-4 flex items-center justify-center text-69px opacity-25"
            :to="{name: 'login'}"
            @click="state.users.logout()"
          >
            <i-fluency-skull class="w-24px h-24px" />
          </router-link>
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
import icon from "/@/components/shared/Icon.vue";
import type { FancyRouteRecord } from "../router";
import BaseTooltip from "./base/BaseTooltip.vue";
import { useState } from "../services/state";
const state = useState();

defineProps<{
	routes: FancyRouteRecord[]
}>();

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
