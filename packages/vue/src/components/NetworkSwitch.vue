<template>
  <div class="flex gap-2.5px max-w-64 flex-wrap">
    <div
      v-for="iface of interfaces"
      :key="iface.n"
      class="cube"
      :class="[
        determineInterfaceColor(iface.s),
        state.settings.general.enable_bloom && 'bloom'
      ]"
      :style="`animation-duration: ${speeds[iface.n]}ms;`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useState } from "/@/app";
import type { INetwork } from "/@/types/api/machine";

const MINIMUM_BLINK_SPEED = 0.001;
const props = defineProps<{interfaces: INetwork[]}>();
const state = useState();
const interfaces = computed(() => props.interfaces);

const determineInterfaceColor = (speed: number) => {
	if (state.settings.general.use_single_color_for_switch_lights) return "text-1000mbps";
	const log = ~~Math.log10(speed);

	switch (log) {
		case 2:
			return "text-100mbps";
		case 3:
			return "text-1000mbps";
		case 4:
			return "text-10000mbps";
		case 5:
			return "text-100000mbps";
		default:
			return "text-100mbps";
	}
};

const determineInterfaceBlinkSpeed = (iface: INetwork) => {
	const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
	if (totalTraffic <= MINIMUM_BLINK_SPEED) return 0;

	const log = ~~Math.log10(totalTraffic);
	switch (log) {
		case 1:
			return 400;
		case 2:
			return 200;
		case 3:
			return 150;
		case 4:
			return 100;
		default:
			return 400;
	}
};

const speeds = computed(() => {
	const nics: Record<string, number> = {};
	interfaces.value.forEach(iface => (nics[iface.n] = determineInterfaceBlinkSpeed(iface)));
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
    @apply bg-white bg-opacity-10;
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
    @apply bg-white bg-opacity-10;
    box-shadow: 0px 0px 6px #00000000;
  }
}

.cube {
  @apply w-5px h-5px bg-white bg-opacity-10;

  &.bloom {
    animation: flashBloom infinite;
  }
  &:not(.bloom) {
    animation: flash infinite;
  }
}
</style>
