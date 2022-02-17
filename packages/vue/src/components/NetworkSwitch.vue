<template>
  <div class="flex gap-3px max-w-64 flex-wrap">
    <div
      v-for="iface of interfaces" :key="iface.n"
      class="cube"
      :class="[
        state.settings.general.use_single_color_for_switch_lights ? `text-1000mbps` : `text-100mbps`,
        !state.settings.general.use_single_color_for_switch_lights && iface.s > 100 && `text-1000mbps`,
        !state.settings.general.use_single_color_for_switch_lights && iface.s > 1000 && 'text-10000mbps',
        state.settings.general.enable_bloom && 'bloom'
      ]"
      :style="`animation-duration: ${speeds[iface.n]}ms;`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { INetwork } from "/@/types/api/machine";
import { useState } from "/@/app";

const MINIMUM_BLINK_SPEED = 0.0001;
const props = defineProps<{interfaces: INetwork[]}>();
const state = useState();
const interfaces = computed(() => props.interfaces);
const speeds = computed(() => {
	const nics: Record<string, number> = {};

	interfaces.value.forEach((iface) => {
		const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
		if (totalTraffic <= MINIMUM_BLINK_SPEED) nics[iface.n] = 0;
		else if (totalTraffic > MINIMUM_BLINK_SPEED && totalTraffic <= 10) nics[iface.n] = 400;
		else if (totalTraffic > 10 && totalTraffic <= 100) nics[iface.n] = 200;
		else if (totalTraffic > 100 && totalTraffic <= 1000) nics[iface.n] = 150;
		else nics[iface.n] = 100;
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
