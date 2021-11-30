<template>
  <div class="coloredGauge w-100px h-100px relative">
    <svg class="flex justify-center items-center transform rotate-90" overflow="visible" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        class="duration-500 ease h-full w-full fill-none stroke-dash-250 stroke-8 stroke-none "
      ></circle>
      <circle
        class="duration-500 ease stroke-6 stroke-dash-250 fill-none stroke-cap-round"
        cx="50"
        cy="50"
        r="40"
        :style="{ stroke: color, 'stroke-dashoffset': 250 - (250 * value) / maxValue }"
      ></circle>
    </svg>
    <Icon
      class="select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      :color="color"
      :icon="icon"
    />
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";

export default {
  name: "ColoredGauge",
  props: {
    icon: { type: String },
    value: { type: [Number, String], required: true, default: 0 },
    maxValue: { type: [Number, String], required: true, default: 100 },
    color: { type: String, required: true, default: "#ff00b6" }
  },
  components: {
    Icon
  }
};
</script>
