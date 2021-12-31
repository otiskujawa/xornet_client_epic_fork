<template>
  <div class="flex gap-3px max-w-32 flex-wrap">
    <div v-for="iface of interfaces" :key="iface.name">
      <base-tooltip :text="iface.name">
        <div class="cube" :style="`animation-duration: ${speeds[iface.name]}ms;`" />
      </base-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { INetwork } from "../../types/api/machine";
import BaseTooltip from "./base/BaseTooltip.vue";
const props = defineProps<{
	interfaces: INetwork[]
}>();

const interfaces = computed(() => props.interfaces);

const speeds = computed(() => {
	const nics: Record<string, number> = {};

	interfaces.value.forEach((iface) => {
		const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
		if (totalTraffic <= 0.1) nics[iface.name] = 0;
		else if (totalTraffic > 0.1 && totalTraffic <= 10) nics[iface.name] = 400;
		else if (totalTraffic > 10 && totalTraffic <= 100) nics[iface.name] = 200;
		else if (totalTraffic > 100 && totalTraffic <= 1000) nics[iface.name] = 150;
		else nics[iface.name] = 100;
	});

	return nics;
});

</script>

<style scoped lang="postcss">

@keyframes flash {
  from {
    /* box-shadow: 0px 0px 6px #00FF67; */
    @apply bg-active bg-opacity-100;
  }
  49% {
    /* box-shadow: 0px 0px 6px #00FF67; */
    @apply bg-active bg-opacity-100;
  }
  50% {
    /* box-shadow: 0px 0px 6px #00000000; */
    @apply bg-white bg-opacity-5;
  }
}

.cube {
  @apply w-6px h-6px bg-white bg-opacity-5;
  animation: flash infinite;
}
</style>
