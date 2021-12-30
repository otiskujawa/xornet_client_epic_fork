<template>
  <div class="flex gap-2px">
    {{ speeds }}
    <div v-for="iface of interfaces" :key="iface.name">
      <div class="cube" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import type { INetwork } from "../../types/api/machine";
const props = defineProps<{
	interfaces: INetwork[]
}>();

const interfaces = computed(() => props.interfaces);

const speeds = reactive<Record<string, number>>({});

onMounted(() => {
	interfaces.value.forEach(iface => watch(iface, () => {
		speeds[iface.name] = iface.tx + iface.rx;
	}));
});

</script>

<style scoped lang="postcss">

@keyframes flash {
  from {
    @apply bg-green-400;
  }
  49% {
    @apply bg-green-400;
  }
  50% {
    @apply bg-black;
  }
}

.cube {
  @apply w-4px h-4px bg-black;
  animation: flash infinite;
}
</style>
