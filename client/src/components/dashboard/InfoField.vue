<template>
  <div class="info" :class="{ borderless }">
    <ColoredGauge :icon="icon" :value="value" :maxValue="maxValue" :color="color" v-if="!nogauge" />
    <Icon v-else :icon="icon" />
    <div class="text">
      <h1 class="title" :style="{ color: `${color}` }">{{ title }}</h1>
      <h1 class="value" v-if="suffix && !maxValue">{{ displayValue }}{{ suffix }}</h1>
      <h1 class="value" v-else-if="maxValue || suffix">{{ displayValue }}/{{ maxValue }}{{ suffix }}</h1>
      <h1 class="value" v-else>{{ displayValue }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/misc/Icon.vue";
import ColoredGauge from "@/components/dashboard/ColoredGauge.vue";
import { computed, defineProps } from "@vue/runtime-core";

const props = defineProps<{
  icon?: string;
  title: string;
  value: string | number;
  tweened?: number | string;
  suffix?: string;
  maxValue?: string | number;
  color?: string;
  nogauge?: boolean;
  borderless?: boolean;
}>();

const displayValue = computed(() => props.tweened || props.value);
</script>

<style lang="postcss" scoped>
.info {
  @apply flex rounded-4px flex-row  gap-2 text-white;
}

.info:not(.borderless) {
  border: 1px solid var(--border-color);
  padding: 16px;
}

img {
  width: auto;
  height: 40px;
  filter: invert(var(--filter));
}

.text {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0px;
}

h1 {
  white-space: nowrap;
}

.title {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
}

.value {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 117.9%;
  /* or 21px */

  display: flex;
  align-items: center;
  text-align: center;
  color: var(--black);
}

.coloredGauge {
  @apply w-12 h-12 min-w-12;
}
</style>
