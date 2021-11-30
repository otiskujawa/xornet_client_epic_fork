<template>
  <div class="multiGauge">
    <svg class="track" overflow="visible" viewBox="0 0 100 100" v-for="(color, index) of colors" :key="color">
      <circle
        class="road"
        cx="50"
        cy="50"
        :r="radius - index * spacingMultiplier"
        :style="{
          'stroke-dasharray': calculateCircumference(radius - index * spacingMultiplier),
          'stroke-dashoffset':
            calculateCircumference(radius - index * spacingMultiplier) -
            (calculateCircumference(radius - index * spacingMultiplier) * (25 * circleDegreePercentage)) / 100
        }"
      ></circle>
      <circle
        class="progress"
        cx="50"
        cy="50"
        :r="radius - index * spacingMultiplier"
        :style="{
          stroke: color,
          'stroke-dasharray': calculateCircumference(radius - index * spacingMultiplier),
          'stroke-dashoffset': calculateProgress(values[index], maxValues[index], radius - index * spacingMultiplier)
        }"
      ></circle>
    </svg>
    <img class="logo" :src="logo" alt="" />
  </div>
</template>

<script>
export default {
  name: "MultiGauge",
  data() {
    return {
      // The starting radius
      radius: 48,

      // The spacing between each circle
      spacingMultiplier: 6,

      // This is the percentage of 360deg of the circle
      // for example 75% would be 270deg,
      circleDegreePercentage: 75
    };
  },
  methods: {
    calculateCircumference(radius) {
      return 2 * 3.1415927 * radius;
    },
    calculateProgress(value, maxValue, radius) {
      const PERCENT = 100;
      const CIRCUMFERENCE = this.calculateCircumference(radius);
      const normalizedValue = value >= maxValue ? maxValue : value;

      const offset = CIRCUMFERENCE - (CIRCUMFERENCE * ((normalizedValue * this.circleDegreePercentage) / maxValue)) / PERCENT;

      return offset;
    }
  },
  props: {
    logo: { type: String },
    values: { type: Array, required: true, default: [0, 0, 0, 0] },
    maxValues: { type: Array, required: true, default: [100, 100, 100, 100] },
    colors: { type: Array, required: true }
  }
};
</script>

<style lang="postcss" scoped>
.multiGauge {
  @apply relative w-200px h-200px;
}

.logo {
  @apply filter invert select-none w-35/100 max-w-35/100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute;
}

.track {
  @apply absolute overflow-visible top-0 left-0 flex justify-center transform rotate-90 items-center;
}

circle {
  @apply h-full w-full fill-none stroke-8 stroke-cap-round;
}

circle:not(.road) {
  transition: 500ms ease;
}

circle.road {
  @apply stroke-3 stroke-gray-400;
}

circle.progress {
  @apply stroke-4;
}
</style>
