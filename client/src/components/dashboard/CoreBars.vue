<template>
  <div class="coreBars relative flex gap-2">
    <div class="bar flex justify-center" v-for="(value, i) in props.cores" :key="`core-${i}`">
      <div class="track"></div>
      <div class="progress" :style="`height: ${value}%;`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
const props = defineProps<{
  cores: number[]
}>();
</script>

<style lang="postcss" scoped>
.bar {
  .progress {
    @apply rounded-full bg-gradient-to-tr from-primary-200 to-tertiary-300 transition-all duration-500 w-2.5 absolute bottom-0 min-h-2.5;
  }
  .track {
    @apply h-full rounded-full bg-gray-300 w-2;
  }

}

</style>