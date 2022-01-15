<template>
  <div class="flex w-full h-full flex-col bg-black bg-opacity-25">
    <top-bar />
    <div class="w-full h-full flex flex-col items-center gap-2 text-12px text-text px-8">
      <div class="option">
        <label for="theme text-xl">Theme</label>
        <base-dropdown v-model="state.settings.theme.value" stay-open :options="['dark', 'light']" />
      </div>
      <div class="option">
        <label for="theme text-xl">API Debug Logger</label>
        <base-switch v-model="state.settings.enableDebugLogger.value" />
      </div>
      <div class="option">
        <label for="theme text-xl">Sound FX</label>
        <base-switch v-model="state.settings.enableSoundEffects.value" />
      </div>
      <div class="option">
        <label for="theme text-xl">Bloom Effects</label>
        <base-switch v-model="state.settings.enableBloom.value" />
      </div>
      <div v-if="isElectron()" class="option">
        <label for="theme">Rounded Window Corners</label>
        <base-switch v-model="state.settings.enableRoundedCorners.value" />
      </div>
      <div v-if="isElectron()" class="option">
        <label for="opacity">Background Opacity</label>
        <div class="flex gap-2 items-center">
          <input v-model="state.settings.opacity.value" type="range" min="0" max="100" step="1">
          {{ state.settings.opacity.value }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "/@/services/logic";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import { useState } from "/@/services/state";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import TopBar from "/@/components/TopBar.vue";
const state = useState();

</script>

<style scoped lang="postcss" >

.option {
  @apply flex w-full gap-2 items-center justify-between max-w-128;
}

</style>
