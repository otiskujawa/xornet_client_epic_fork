<template>
  <li
    :class="[mode === 'minimal' ? 'justify-center' : 'justify-between']"
    class="text-12px text-text text-opacity-50 cursor-pointer list-none flex py-6px px-16px items-center"
  >
    <div class="flex gap-3 items-center">
      <distro-icon class="w-16px h-16px min-w-16px min-h-16px" :name="machine.owner_uuid" />
      <p v-if="mode !== 'minimal'" class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full">
        {{ machine.name }}
      </p>

      <i-fluency-processor /> <p>{{ cpuUsage }} %</p>
    </div>
    <i-fluency-status
      v-if="mode !== 'minimal'"
      class="w-16px h-16px min-w-16px min-h-16px"
      :class="machine.status ? 'text-green-400' : 'text-gray-400'"
    />
  </li>
</template>

<script setup lang="ts">
import type { IMachine } from "types/api/machine";
import { computed } from "vue";
import DistroIcon from "/@/components/shared/DistroIcon.vue";
const props = defineProps<{
	mode: "minimal" | "normal" | "maximal"
	machine: IMachine
}>();

const cpuUsage = computed(() => (props.machine.dynamic_data.cpu.usage.reduce((a, b) => a + b, 0) / props.machine.dynamic_data.cpu.usage.length).toFixed(2));

</script>

<style scoped lang="postcss">
li {
  &:hover {
    @apply bg-black bg-opacity-25 text-opacity-100;
  }
}
</style>
