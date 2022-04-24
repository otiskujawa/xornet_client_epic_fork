<template>
  <div class="flex flex-col-reverse sm:flex-row w-full h-full">
    <navigation-bar :routes="routes[1].children!" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "/@/components/NavigationBar.vue";
import { routes } from "/@/router";
</script>
