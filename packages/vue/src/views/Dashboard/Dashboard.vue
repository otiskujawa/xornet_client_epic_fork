<template>
  <navigation-bar :routes="routes[1].children!" />
  <router-view />
</template>

<script setup lang="ts">
import NavigationBar from "/@/components/NavigationBar.vue";
import { routes } from "/@/router";
</script>

<style scoped lang="postcss">

</style>
