<template>
  <div v-if="value && !value.toString().includes('NaN') && !value.toString().includes('undefined')" class="flex gap-2 items-center">
    <div class="flex items-center gap-2" :class="!dontFade && 'opacity-50'">
      <slot />
    </div>
    {{ value }} <strong class="font-normal opacity-50">{{ suffix }}</strong>
  </div>
  <div v-else class="flex gap-2 items-center opacity-50">
    <slot />
    Unavailable
  </div>
</template>

<script setup lang="ts">
defineProps<{value?: string | number; suffix?: string; dontFade?: boolean}>();
</script>
