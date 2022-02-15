<template>
  <div class="option">
    <div class="flexcol ">
      <label>{{ label }}</label>
      <p v-if="description" class=" text-xs opacity-40">
        {{ description }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{label: string; description?: string}>();
</script>

<style lang="postcss" scoped>
.option {
  @apply flex w-full my-2 gap-2 items-center justify-between;
}
</style>
