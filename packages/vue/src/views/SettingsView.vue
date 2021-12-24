<template>
  <div class="w-full text-12px bg-black text-text bg-opacity-25 p-8">
    <label for="theme">Theme</label>
    <select v-model="state.settings.theme" class="bg-background" name="theme" id="theme">
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useState } from "../services/state";
const state = useState();
</script>

<style scoped lang="postcss"></style>
