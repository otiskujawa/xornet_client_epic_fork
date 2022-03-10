<template>
  <div class="flex flex-col-reverse sm:flex-row w-full h-full">
    <navigation-bar :routes="routes[1].children!" />
    <router-view />
  </div>
  <status-bar v-if="state.settings.general.enable_status_bar" />
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import NavigationBar from "/@/components/NavigationBar.vue";
import StatusBar from "/@/components/StatusBar.vue";
import { routes } from "/@/router";
const state = useState();
</script>
