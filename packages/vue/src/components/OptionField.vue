<template>
  <div class="flexcol w-full" :class="!minimal && 'border-1 border-background-500 p-4 bg-background-300 rounded-8px gap-2'">
    <div class="option">
      <div class="flexcol gap-1">
        <label class="flex gap-2 items-center">
          <tag v-if="newFeature" text="New" class="text-primary-500 bg-primary-500" />
          {{ label }}
        </label>
        <p v-if="description" class="font-light text-xs opacity-40">
          {{ description }}
        </p>
      </div>
      <slot />
    </div>
    <slot name="example" />
  </div>
</template>

<script setup lang="ts">
import Tag from "./Tag.vue";
defineProps<{label: string; minimal?: boolean; description?: string; newFeature?: boolean}>();
</script>

<style lang="postcss" scoped>
.option {
  @apply flex w-full gap-2 items-center justify-between;
}
</style>
