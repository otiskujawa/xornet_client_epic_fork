<template>
  <li
    :class="[mode === 'minimal' ? 'justify-center' : 'justify-between']"
    class="text-12px text-white text-opacity-50 cursor-pointer list-none flex py-6px px-16px items-center"
  >
    <div class="flex gap-3 items-center">
      <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.distro" />
      <p v-if="mode !== 'minimal'" class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full">
        {{ machine.hostname }}
      </p>
    </div>
    <i-fluency-status
      v-if="mode !== 'minimal'"
      class="w-16px h-16px min-w-16px min-h-16px"
      :class="machine.isOnline ? 'text-green-400' : 'text-gray-400'"
    />
  </li>
</template>

<script setup lang="ts">
defineProps<{
  mode: "minimal" | "normal" | "maximal";
  machine: { uuid: string; hostname: string; isOnline: boolean; distro: string };
}>();
import DistroIcon from "/@/components/shared/DistroIcon.vue";
</script>

<style scoped lang="postcss">
li {
  &:hover {
    @apply bg-black bg-opacity-25 text-opacity-100;
  }
}
</style>
