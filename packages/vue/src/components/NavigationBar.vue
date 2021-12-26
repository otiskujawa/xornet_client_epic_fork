<template>
  <nav class="h-full w-min flex flex-col">
    <ul>
      <base-tooltip
        :text="route.name as string"
        v-for="route of routes.filter(route => !!route.icon)"
        :key="route.path"
      >
        <li class="flex">
          <router-link
            class="p-4 flex items-center justify-center text-69px text-text opacity-25"
            :to="route.name"
          >
            <icon class="w-24px h-24px" :name="route.icon!" />
          </router-link>
        </li>
      </base-tooltip>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import icon from "/@/components/shared/Icon.vue";
import type { FancyRouteRecord } from "../router";
import BaseTooltip from "./base/BaseTooltip.vue";

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
