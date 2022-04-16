<template>
  <div
    class="cube"
    :class="[
      determineInterfaceColor(iface),
      state.settings.general.enable_bloom && 'bloom',
      state.settings.general.rounded_network_interfaces ? 'rounded-full' : 'rounded-0px',
      state.settings.general.filled_network_interfaces ? 'filled' : 'stroked'
    ]"
    :style="`animation-duration: ${speed}ms;`"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useState } from "../app";
import { determineInterfaceColor } from "../services/logic";
import type { INetwork } from "../types/api/machine";
const state = useState();
const props = defineProps<{iface: INetwork; docker?: boolean}>();

const determineInterfaceBlinkSpeed = (iface: INetwork) => {
	const totalTraffic = (iface.tx + iface.rx) / 1000 / 1000;
	if (totalTraffic < state.settings.general.minimum_blink_speed) return 0;

	if (state.settings.general.use_new_blink_algorithm) {
		// the higher the traffic exponentially the less the ms between blinks
		const ms = totalTraffic ** 0.25 * 100;
		const result = Math.min(ms, 5000);

		// flip the result
		return Math.max(50, 700 - result);
	}

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
		case 5:
			return 50;
		default:
			return 400;
	}
};
const speed = computed(() => determineInterfaceBlinkSpeed(props.iface));

</script>

<style scoped lang="postcss">

@keyframes flashStroked {
  from {
    @apply border-current;
  }
  49% {
    @apply border-current;
  }
  50% {
    @apply border-current;
  }
}

@keyframes flashStrokedBloom {
  from {
    @apply border-current;
    box-shadow: 0px 0px 6px currentColor;
  }
  49% {
    @apply border-current;
    box-shadow: 0px 0px 6px currentColor;
  }
  50% {
    @apply border-current;
    box-shadow: 0px 0px 6px #00000000;
  }
}

@keyframes flashFilled {
  from {
    @apply bg-current;
  }
  49% {
    @apply bg-current;
  }
  50% {
    @apply bg-current;
  }
}

@keyframes flashFilledBloom {
  from {
    @apply bg-current;
    box-shadow: 0px 0px 6px currentColor;
  }
  49% {
    @apply bg-current;
    box-shadow: 0px 0px 6px currentColor;
  }
  50% {
    @apply bg-current;
    box-shadow: 0px 0px 6px #00000000;
  }
}

.cube {
  @apply w-6px h-6px border-1 bg-background-400 border-transparent flex items-center justify-center;

  &.stroked {
    &.bloom {
      animation: flashStrokedBloom infinite;
    }
    &:not(.bloom) {
      animation: flashStroked infinite;
    }
  }

  &.filled {
    &.bloom {
      animation: flashFilledBloom infinite;
    }
    &:not(.bloom) {
      animation: flashFilled infinite;
    }
  }
}
</style>
