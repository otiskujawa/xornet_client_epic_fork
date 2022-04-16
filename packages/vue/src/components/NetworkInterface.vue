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
import { determineInterfaceBlinkSpeed, determineInterfaceColor } from "../services/logic";
import type { INetwork } from "../types/api/machine";
const state = useState();
const props = defineProps<{iface: INetwork; docker?: boolean}>();
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
