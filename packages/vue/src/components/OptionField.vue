<template>
  <div class="option ">
    <div class="flexcol gap-1">
      <label>
        <label v-if="newFeature" class="w-min rounded-full text-xs bg-primary-400 px-2.5 py-0.5 ">NEW</label>
        {{ label }}
      </label>
      <p v-if="description" class=" text-xs opacity-40">
        {{ description }}
      </p>
    </div>
    <slot />
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
