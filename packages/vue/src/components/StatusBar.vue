<template>
  <div class="flex items-center px-2 gap-2 h-6 bg-background-500 text-xs text-text">
    <p>{{ xornet.api.isAlive.value ? 'Connected' : 'Disconnected' }}</p>
    <p>{{ fps }}FPS</p>
  </div>
</template>

<script setup lang="ts">
import { useFps } from "@vueuse/core";
import xornet from "../app";
const fps = useFps({ every: 5 });
</script>
