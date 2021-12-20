<template>
  <nav class="h-full w-min flex flex-col">
    <ul>
      <li class="flex" v-for="route of routes">
        <router-link class="p-4 text-2xl text-white opacity-25" :to="route.name"><icon :name="route.icon" /></router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { routes } from "/@/router";
import icon from "/@/components/shared/Icon.vue";
</script>

<style scoped lang="postcss">
a {
  &:hover {
    @apply opacity-50;
  }
  &.router-link-active {
    @apply opacity-100;
  }
}
</style>
