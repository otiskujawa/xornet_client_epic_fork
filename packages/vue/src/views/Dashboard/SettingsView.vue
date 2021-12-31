<template>
  <div class="w-full flex flex-col gap-2 text-12px bg-black text-text bg-opacity-25 p-8">
    <div class="flex gap-2 items-center">
      <label for="theme text-xl">Theme</label>
      <base-dropdown v-model="state.settings.theme.value" stay-open :options="['dark', 'light']" />
    </div>
    <div class="flex gap-2 items-center">
      <label for="theme text-xl">API Debug Logger</label>
      <base-dropdown v-model="state.settings.enableDebugLogger.value" stay-open :options="[true, false]" />
    </div>
    <div v-if="isElectron()">
      <label for="opacity">Background Opacity</label>
      <input v-model="state.settings.opacity.value" type="range" min="0" max="100" step="1">
      {{ state.settings.opacity.value }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import { useState } from "/@/services/state";
const state = useState();

</script>

<style scoped lang="postcss"></style>
