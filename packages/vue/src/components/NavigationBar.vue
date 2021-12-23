<template>
  <nav class="h-full w-min flex flex-col">
    <ul>
      <li class="flex" v-for="route of routes">
        <router-link class="p-4 flex items-center justify-center text-69px text-white opacity-25" :to="route.name"
          ><icon class="w-24px h-24px" :name="route.icon"
        /></router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import icon from "/@/components/shared/Icon.vue";
import { routes } from "/@/router";
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
