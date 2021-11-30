<template>
  <div class="coreBars relative flex gap-2">
    <div class="bar flex justify-center" v-for="(value, i) in props.cores" :key="`core-${i}`">
      <div class="track h-full rounded-full bg-gray-300 w-2"></div>
      <div
        class="progress rounded-full bg-gradient-to-tr from-primary-200 to-tertiary-200 transform transition-all duration-500 w-2.5 absolute bottom-0 min-h-2.5"
        :class="{ watchOut: value >= 50, death: value >= 95 }"
        :style="`height: ${value}%;`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
const props = defineProps<{
  cores: number[];
}>();
</script>

<style lang="postcss" scoped>
.watchOut {
  @apply from-yellow-300 to-orange-500;
}
.death {
  @apply from-red-600 to-purple-500;
}
</style>
