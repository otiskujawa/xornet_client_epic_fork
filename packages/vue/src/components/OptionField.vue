<template>
  <div class="flexcol w-full" :class="!minimal && ' bg-background-300 p-4  rounded-8px gap-2'">
    <div class="option">
      <div class="flex items-center gap-4">
        <slot name="icon" />
        <div class="flexcol gap-1">
          <label class="flex gap-2 items-center">
            <new-tag v-if="newFeature" />
            {{ label }}
          </label>
          <p v-if="description" class="font-light text-xs opacity-40">
            {{ description }}
          </p>
        </div>
      </div>
      <slot />
    </div>
    <slot name="example" />
  </div>
</template>

<script setup lang="ts">
import NewTag from "./tags/NewTag.vue";
defineProps<{label: string; minimal?: boolean; description?: string; newFeature?: boolean}>();
</script>

<style lang="postcss" scoped>
.option {
  @apply flex w-full gap-2 items-center justify-between;
}
</style>
