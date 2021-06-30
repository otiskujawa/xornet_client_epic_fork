<template>
  <div v-if="!borderless && color" class="coloredIconContainer" :style="{ 'background-color': `${color}1f` }">
    <div class="coloredIcon" :style="{ 'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color }"></div>
  </div>
  <div
    v-else-if="borderless && color"
    class="coloredIcon"
    :style="{ 'mask-image': `url(https://xornet.cloud${image})`, 'background-color': color }"
  ></div>
  <img v-else name="icon" :class="{ app }" class="icon" :src="image" :alt="icon" />
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useLocalStorage } from '@vueuse/core';
import { iconStroke } from '@/states/prefs';
const props = defineProps({
    icon: { type: String, required: true },
    default: { type: String, required: false },
    app: { type: Boolean, required: false },
    color: { type: String, required: false },
    borderless: { type: Boolean, required: false }
});
const image = computed(() => {
  const stroke = iconStroke.value;
  try {
    if (props.app) var icon = require(`@/assets/icons/apps/${props.icon}.svg`);
    else var icon = require(`@/assets/icons/${stroke ? "stroked" : "filled"}/${props.icon}.svg`);
  } catch (error) {
    try {
      if (!icon) icon = require(`@/assets/icons/${stroke ? "stroked" : "filled"}/${props.default}.svg`);
    } catch (error) {
      if (!icon) icon = require(`@/assets/icons/${stroke ? "stroked" : "filled"}/missing.svg`);
    }
  }
  return icon;
});
</script>

<style lang="postcss" scoped>
.coloredIconContainer {
  @apply p-1 rounded-full w-8 h-8 flex items-center justify-center;
}

.coloredIcon {
    mask-position: center;
    mask-size: contain;
    mask-repeat: no-repeat;
    width: inherit;
    height: inherit;
}
.icon:not(.taskIcon) {
    max-width: initial;
  filter: invert(1);
}
</style>
