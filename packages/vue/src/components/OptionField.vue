<template>
  <div class="flexcol p-2 w-full bg-background-300 rounded-8px gap-2 ">
    <div class="option">
      <div class="flexcol  gap-1">
        <label>
          <label v-if="newFeature" class="w-min rounded-full text-xs bg-primary-400 px-2.5 py-0.5 ">NEW</label>
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
defineProps<{label: string; description?: string; newFeature?: boolean}>();
</script>

<style lang="postcss" scoped>
.option {
  @apply flex w-full my-2 gap-2 items-center justify-between;
}
</style>
