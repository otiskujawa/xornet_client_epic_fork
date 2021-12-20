<template>
  <div>
    <navigation-bar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./components/shared/NavigationBar.vue";
</script>

<style lang="postcss">
body,
html,
#app {
  @apply h-full w-full;
}
</style>
