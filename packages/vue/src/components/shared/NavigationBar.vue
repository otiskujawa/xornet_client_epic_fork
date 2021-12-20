<template>
  <nav class="h-full flex flex-col">
    <ul>
      <li class="p-4 text-white opacity-25" v-for="route of routes">
        <router-link :to="route.name"> <icon :name="route.icon" />{{ route.name }} </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { routes } from "/@/router";
import icon from "/@/components/shared/Icon.vue";
</script>

<style scoped lang="postcss">
li {
  &:hover {
    @apply opacity-50;
  }
  &.router-link-active {
    @apply opacity-100;
  }
}
</style>
