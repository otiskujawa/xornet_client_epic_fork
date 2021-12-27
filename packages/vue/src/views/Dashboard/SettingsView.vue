<template>
  <div class="w-full flex flex-col gap-2 text-12px bg-black text-text bg-opacity-25 p-8">
    <div class="flex gap-2 items-center">
      <label for="theme text-xl">Theme</label>
      <base-dropdown stay-open v-model="state.settings.theme" :options="['dark', 'light']" />
    </div>
    <div v-if="isElectron()">
      <label for="opacity">Background Opacity</label>
      <input v-model="state.settings.opacity" type="range" min="0" max="100" step="1">
      {{ state.settings.opacity }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import { useState } from "/@/services/state";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
const state = useState();
</script>

<style scoped lang="postcss"></style>
