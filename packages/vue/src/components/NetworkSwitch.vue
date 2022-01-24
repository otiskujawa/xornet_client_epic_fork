<template>
  <div class="flex gap-3px max-w-32 flex-wrap">
    <div
      v-for="iface of interfaces" :key="iface.name"
      class="cube text-100mbps"
      :class="[
        iface.speed > 100 && `text-1000mbps`,
        iface.speed > 1000 && 'text-10000mbps',
        state.settings.enableBloom.value && 'bloom'
      ]"
      :style="`animation-duration: ${speeds[iface.name]}ms;`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { INetwork } from "../../types/api/machine";
import { useState } from "../services/state";
const MINIMUM_BLINK_SPEED = 0.025;
const props = defineProps<{interfaces: INetwork[]}>();
const state = useState();
const interfaces = computed(() => props.interfaces);
const speeds = computed(() => {
	const nics: Record<string, number> = {};

	interfaces.value.forEach((iface) => {
		const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
		if (totalTraffic <= MINIMUM_BLINK_SPEED) nics[iface.name] = 0;
		else if (totalTraffic > MINIMUM_BLINK_SPEED && totalTraffic <= 10) nics[iface.name] = 400;
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
    @apply bg-current bg-opacity-100;
  }
  49% {
    @apply bg-current bg-opacity-100;
  }
  50% {
    @apply bg-white bg-opacity-5;
  }
}

@keyframes flashBloom {
  from {
    @apply bg-current bg-opacity-100;
    box-shadow: 0px 0px 6px currentColor;
  }
  49% {
    @apply bg-current bg-opacity-100;
    box-shadow: 0px 0px 6px currentColor;
  }
  50% {
    @apply bg-white bg-opacity-5;
    box-shadow: 0px 0px 6px #00000000;
  }
}

.cube {
  @apply w-6px h-6px bg-white bg-opacity-5;

  &.bloom {
    animation: flashBloom infinite;
  }
  &:not(.bloom) {
    animation: flash infinite;
  }
}
</style>
