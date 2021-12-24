<template>
  <div class="w-full flex flex-col gap-2 text-12px bg-black text-text bg-opacity-25 p-8">
    <div>
      <label for="theme">Theme</label>
      <select v-model="state.settings.theme" class="bg-background" name="theme" id="theme">
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </div>
    <div v-if="isElectron()">
      <label for="opacity">Background Opacity</label>
      <input type="range" v-model="state.settings.opacity" min="0" max="100" step="1" />
      {{ state.settings.opacity }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { isElectron } from "../services/logic";
import { useState } from "../services/state";
const state = useState();
</script>

<style scoped lang="postcss"></style>
