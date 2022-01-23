<template>
  <div class="flex w-full h-full">
    <navigation-bar :routes="routes[1].children!" />
    <router-view />
  </div>
  <status-bar v-if="state.settings.enableStatusBar.value" />
</template>

<script setup lang="ts">
import NavigationBar from "/@/components/NavigationBar.vue";
import StatusBar from "/@/components/StatusBar.vue";
import { routes } from "/@/router";
import { useState } from "/@/services/state";
const state = useState();
</script>
<style scoped lang="postcss">

</style>
